import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";
import { isString } from "../../typeGuards/isString";
import { getThemeKind } from "../common/App/styles";
import { NewButton } from "../common/v3/NewButton";
import { Select } from "../common/v3/Select";
import type { SelectItem } from "../common/v3/Select/types";
import { scanRunningIdeProjects } from "./scanRunningIdeProjects";
import { showIdeProject } from "./showIdeProject";
import * as s from "./styles";
import type { ShowIdeProjectResult } from "./types";

const SELECT_VALUE_DELIMITER = ":";

const getSelectItemValue = (port: number, project: string) =>
  `${port}${SELECT_VALUE_DELIMITER}${project}`;

const parseSelectedItemValue = (value: string) => {
  const [port, project] = value.split(SELECT_VALUE_DELIMITER);
  return { port: Number(port), project };
};

const getURLQueryParams = (url: string) => {
  const searchParams = new URLSearchParams(url);
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

export const IdeLauncher = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const params = getURLQueryParams(window.location.search);
  const action = params["plugin.action"];
  const [selectItems, setSelectItems] = useState<SelectItem[]>();
  const isMobile = ["Android", "iPhone", "iPad"].some((x) =>
    window.navigator.userAgent.includes(x)
  );
  const [isIdeProjectScanningInProgress, setIsIdeProjectScanningInProgress] =
    useState(false);
  const [isShowIdeProjectInProgress, setIsShowIdeProjectInProgress] =
    useState(false);
  const [showIdeProjectResult, setShowIdeProjectResult] =
    useState<ShowIdeProjectResult>();

  const tryToShowIdeProject = useCallback(
    async (port: number, project: string) => {
      setShowIdeProjectResult(undefined);
      setIsShowIdeProjectInProgress(true);
      const params = getURLQueryParams(window.location.search);
      const result = await showIdeProject(port, project, params);
      setShowIdeProjectResult(result);
      setIsShowIdeProjectInProgress(false);
    },
    []
  );

  const tryToScanRunningIdeProjects = useCallback(async () => {
    setSelectItems(undefined);
    setIsIdeProjectScanningInProgress(true);
    const result = await scanRunningIdeProjects();
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
    window.location.reload();
  };

  const handleTryShowIdeProjectAgainButtonClick = async () => {
    const selectedItemValue = selectItems?.find((item) => item.selected)?.value;
    if (!selectedItemValue) {
      return;
    }

    const { port, project } = parseSelectedItemValue(selectedItemValue);
    await tryToShowIdeProject(port, project);
  };

  const handleGetDigmaButtonClick = () => {
    window.open(
      "https://plugins.jetbrains.com/plugin/19470-digma-continuous-feedback",
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

  const selectedItem = selectItems?.find((item) => item.selected);

  const renderContent = () => {
    if (!action) {
      return (
        <s.TextContainer>
          <s.Title>Invalid link</s.Title>
          <s.Subtitle>Link is partial or invalid</s.Subtitle>
        </s.TextContainer>
      );
    }

    if (isMobile) {
      return (
        <s.TextContainer>
          <s.Title>Can&apos;t open Digma link</s.Title>
          <s.Subtitle>
            Digma links can only be opened on desktop/laptop
          </s.Subtitle>
        </s.TextContainer>
      );
    }

    if (isIdeProjectScanningInProgress) {
      return (
        <s.TextContainer>
          <s.Title>Searching for a running IDE</s.Title>
          <s.Subtitle>
            You&apos;ll need an IDE installed with Digma configured to open the
            link
          </s.Subtitle>
        </s.TextContainer>
      );
    }

    if (isShowIdeProjectInProgress) {
      return (
        <s.TextContainer>
          <s.Title>Opening the Digma link in your IDE</s.Title>
        </s.TextContainer>
      );
    }

    if (showIdeProjectResult?.result === "failure") {
      return (
        <>
          <s.TextContainer>
            <s.Title>There was an issue opening the link in the IDE</s.Title>
            <s.Subtitle>
              Please check that IDE is running and click the{" "}
              <s.EmphasizedText>Try again</s.EmphasizedText> button below.
            </s.Subtitle>
          </s.TextContainer>
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
        <s.TextContainer>
          <s.Title>Opening the Digma link in your IDE</s.Title>
          <s.Subtitle>
            Switching over to the IDE. You can close this tab.
          </s.Subtitle>
        </s.TextContainer>
      );
    }

    if (!selectItems) {
      return null;
    }

    if (selectItems.length === 0) {
      return (
        <>
          <s.TextContainer>
            <s.Title>Unable to open the Digma link</s.Title>
            <s.Subtitle>
              Opening this link requires a running IDE with Digma installed and
              configured. Launch your IDE and install Digma as needed, then
              click the <s.EmphasizedText>Try again</s.EmphasizedText> button.
            </s.Subtitle>
          </s.TextContainer>
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
          <s.TextContainer>
            <s.Title>Select the IDE project to view the Digma link</s.Title>
            <s.Subtitle>
              We&apos;ll automatically switch to the IDE once you make a
              selection
            </s.Subtitle>
          </s.TextContainer>
          <s.SelectContainer>
            <Select
              placeholder={selectedItem?.label ?? "Select IDE Project"}
              items={selectItems}
              onChange={(value) => {
                void handleSelectChange(value);
              }}
            />
          </s.SelectContainer>
        </>
      );
    }
  };

  return (
    <s.Container>
      <Helmet>
        <title>Digma IDE Plugin Launcher</title>
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      <s.Header>
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://digma.ai"}
        >
          <s.Logo src={`/assets/images/digmaLogo_${themeKind}.svg`} />
        </a>
      </s.Header>
      <s.Content>{renderContent()}</s.Content>
      <s.Footer>
        <span>&copy; {new Date().getFullYear()}</span>
        <s.FooterLink
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://digma.ai"}
        >
          digma.ai
        </s.FooterLink>
        <span>&#183; All Rights Reserved</span>
      </s.Footer>
    </s.Container>
  );
};
