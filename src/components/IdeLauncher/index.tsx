import { useCallback, useEffect, useState } from "react";
import { JETBRAINS_MARKETPLACE_PLUGIN_URL } from "../../constants";
import { useStableSearchParams } from "../../hooks/useStableSearchParams";
import { isString } from "../../typeGuards/isString";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { GenericPageLayout } from "../common/GenericPageLayout";
import {
  Subtitle,
  TextContainer,
  Title
} from "../common/GenericPageLayout/styles";
import { NewButton } from "../common/v3/NewButton";
import type { SelectItem } from "../common/v3/Select/types";
import { IdeProjectSelect } from "./common/IdeProjectSelect";
import { getSelectItemValue } from "./common/IdeProjectSelect/utils/getSelectedItemValue";
import { parseSelectedItemValue } from "./common/IdeProjectSelect/utils/parseSelectedItemValue";
import { scanRunningIntellijIdeProjects } from "./scanRunningIntellijIdeProjects";
import { showIdeProject } from "./showIdeProject";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type { ShowIntellijIdeProjectResult } from "./types";

export const IdeLauncher = () => {
  const [searchParams] = useStableSearchParams();
  const action = searchParams.get("plugin.action");
  const [selectItems, setSelectItems] = useState<SelectItem[]>();
  const isMobile = ["Android", "iPhone", "iPad"].some((x) =>
    window.navigator.userAgent.includes(x)
  );
  const [isIdeProjectScanningInProgress, setIsIdeProjectScanningInProgress] =
    useState(false);
  const [isShowIdeProjectInProgress, setIsShowIdeProjectInProgress] =
    useState(false);
  const [showIdeProjectResult, setShowIdeProjectResult] =
    useState<ShowIntellijIdeProjectResult>();

  const tryToShowIdeProject = useCallback(
    async (port: number, project: string) => {
      setShowIdeProjectResult(undefined);
      setIsShowIdeProjectInProgress(true);
      const result = await showIdeProject(
        port,
        project,
        Object.fromEntries(searchParams)
      );
      sendTrackingEvent(trackingEvents.IDE_PROJECT_OPEN_RESULT_RECEIVED, {
        result
      });
      setShowIdeProjectResult(result);
      setIsShowIdeProjectInProgress(false);
    },
    [searchParams]
  );

  const tryToScanRunningIdeProjects = useCallback(async () => {
    setSelectItems(undefined);
    setIsIdeProjectScanningInProgress(true);
    const result = await scanRunningIntellijIdeProjects();
    setIsIdeProjectScanningInProgress(false);

    const projects = result
      .filter((x) => x.response.isCentralized)
      .flatMap((info) =>
        info.response.openProjects.map((project) => ({
          ...info,
          project: project,
          port: info.port
        }))
      );

    setSelectItems(
      projects.map((x, i) => ({
        label: `${x.response.name} (${x.project})`,
        description: `${x.response.name} (${x.project})`,
        value: getSelectItemValue(x.port, x.project),
        enabled: true,
        selected: projects.length === 1 && i === 0
      }))
    );

    if (projects.length === 1) {
      await tryToShowIdeProject(projects[0].port, projects[0].project);
    }
  }, [tryToShowIdeProject]);

  const handleSelectChange = async (value: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.IDE_PROJECT_SELECTED);
    const selectedValue = isString(value) ? value : value[0];
    const { port, project } = parseSelectedItemValue(selectedValue);

    if (!selectItems) {
      return;
    }

    setSelectItems(
      selectItems.map((item) => ({
        ...item,
        selected: item.value === selectedValue
      }))
    );

    await tryToShowIdeProject(port, project);
  };

  const handleTryScanningAgainButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TRY_SCANNING_AGAIN_BUTTON_CLICKED
    );
    window.location.reload();
  };

  const handleTryShowIdeProjectAgainButtonClick = async () => {
    sendUserActionTrackingEvent(trackingEvents.TRY_AGAIN_BUTTON_CLICKED);
    const selectedItemValue = selectItems?.find((item) => item.selected)?.value;
    if (!selectedItemValue) {
      return;
    }

    const { port, project } = parseSelectedItemValue(selectedItemValue);
    await tryToShowIdeProject(port, project);
  };

  const handleGetDigmaButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.GET_DIGMA_BUTTON_CLICKED);
    window.open(
      JETBRAINS_MARKETPLACE_PLUGIN_URL,
      "_blank",
      "noopener noreferrer"
    );
  };

  useEffect(() => {
    async function initialScan() {
      await tryToScanRunningIdeProjects();
    }

    if (!isMobile) {
      void initialScan();
    }
  }, [isMobile, tryToScanRunningIdeProjects]);

  const renderContent = () => {
    if (!action) {
      return (
        <TextContainer>
          <Title>Invalid link</Title>
          <Subtitle>Link is partial or invalid</Subtitle>
        </TextContainer>
      );
    }

    if (isMobile) {
      return (
        <TextContainer>
          <Title>Can&apos;t open Digma link</Title>
          <Subtitle>Digma links can only be opened on desktop/laptop</Subtitle>
        </TextContainer>
      );
    }

    if (isIdeProjectScanningInProgress) {
      return (
        <TextContainer>
          <Title>Searching for a running IDE</Title>
          <Subtitle>
            You&apos;ll need an IDE installed with Digma configured to open the
            link
          </Subtitle>
        </TextContainer>
      );
    }

    if (isShowIdeProjectInProgress) {
      return (
        <TextContainer>
          <Title>Opening the Digma link in your IDE</Title>
        </TextContainer>
      );
    }

    if (showIdeProjectResult?.result === "failure") {
      return (
        <>
          <TextContainer>
            <Title>There was an issue opening the link in the IDE</Title>
            <Subtitle>
              Please check that IDE is running and click the{" "}
              <s.EmphasizedText>Try again</s.EmphasizedText> button below.
            </Subtitle>
          </TextContainer>
          <NewButton
            label={"Try again"}
            onClick={() => {
              void handleTryShowIdeProjectAgainButtonClick();
            }}
          />
        </>
      );
    }

    if (showIdeProjectResult?.result === "success") {
      return (
        <TextContainer>
          <Title>Opening the Digma link in your IDE</Title>
          <Subtitle>
            Switching over to the IDE. You can close this tab.
          </Subtitle>
        </TextContainer>
      );
    }

    if (!selectItems) {
      return null;
    }

    if (selectItems.length === 0) {
      return (
        <>
          <TextContainer>
            <Title>Unable to open the Digma link</Title>
            <Subtitle>
              Opening this link requires a running IDE with Digma installed and
              configured. Launch your IDE and install Digma as needed, then
              click the <s.EmphasizedText>Try again</s.EmphasizedText> button.
            </Subtitle>
          </TextContainer>
          <s.ButtonsContainer>
            <NewButton
              label={"Try again"}
              onClick={handleTryScanningAgainButtonClick}
              buttonType={"secondary"}
            />
            <NewButton
              label={"Get Digma"}
              onClick={handleGetDigmaButtonClick}
            />
          </s.ButtonsContainer>
        </>
      );
    }

    if (selectItems.length > 1) {
      return (
        <>
          <TextContainer>
            <Title>Select the IDE project to view the Digma link</Title>
            <Subtitle>
              We&apos;ll automatically switch to the IDE once you make a
              selection
            </Subtitle>
          </TextContainer>
          <IdeProjectSelect
            items={selectItems}
            onChange={(value) => void handleSelectChange(value)}
          />
        </>
      );
    }
  };

  return (
    <GenericPageLayout title={"Digma IDE Plugin Launcher"}>
      {renderContent()}
    </GenericPageLayout>
  );
};
