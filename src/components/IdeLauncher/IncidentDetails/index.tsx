import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePrevious } from "../../../hooks/usePrevious";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { uniqueBy } from "../../../utils/uniqueBy";
import {
  Subtitle,
  TextContainer,
  Title
} from "../../common/GenericPageLayout/styles";
import { NewButton } from "../../common/v3/NewButton";
import type { SelectItem } from "../../common/v3/Select/types";
import { IdeProjectSelect } from "../common/IdeProjectSelect";
import { scanRunningVSCodeIdeProjects } from "../scanRunningVSCodeIdeProjects";
import { ButtonsContainer, EmphasizedText } from "../styles";
import { trackingEvents } from "../tracking";
import { addChatContextIncidentFile } from "./addChatContextFile";

export const IncidentDetails = () => {
  const params = useParams();
  const incidentId = params.id;
  const [selectItems, setSelectItems] = useState<SelectItem[]>();
  const [isIdeProjectScanningInProgress, setIsIdeProjectScanningInProgress] =
    useState(false);
  const previousIsProjectScanningInProgress = usePrevious(
    isIdeProjectScanningInProgress
  );
  const [
    isAddingChatContextFileInProgress,
    setAddingChatContextFileInProgress
  ] = useState(false);

  const tryToAddChatContextFile = useCallback(
    (ideUriScheme: string, incidentId: string) => {
      setAddingChatContextFileInProgress(true);

      addChatContextIncidentFile(ideUriScheme, incidentId);
    },
    []
  );

  const tryToScanRunningIdeProjects = useCallback(async () => {
    setSelectItems(undefined);
    setIsIdeProjectScanningInProgress(true);
    const result = await scanRunningVSCodeIdeProjects();
    setIsIdeProjectScanningInProgress(false);

    const ides = uniqueBy(
      result.map((x) => x.response),
      "ideUriScheme"
    );

    setSelectItems(
      ides.map((x, i) => ({
        label: x.ideName,
        description: x.ideName,
        value: x.ideUriScheme,
        enabled: true,
        selected: result.length === 1 && i === 0
      }))
    );
  }, []);

  // Automatically select the first IDE if there is only one available
  useEffect(() => {
    if (
      previousIsProjectScanningInProgress &&
      !isIdeProjectScanningInProgress &&
      selectItems?.length === 1 &&
      incidentId
    ) {
      tryToAddChatContextFile(selectItems[0].value, incidentId);
    }
  }, [
    incidentId,
    isIdeProjectScanningInProgress,
    previousIsProjectScanningInProgress,
    tryToAddChatContextFile,
    selectItems
  ]);

  const handleSelectChange = (value: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.IDE_PROJECT_SELECTED);
    const selectedValue = isString(value) ? value : value[0];

    if (!selectItems) {
      return;
    }

    setSelectItems(
      selectItems.map((item) => ({
        ...item,
        selected: item.value === selectedValue
      }))
    );

    if (!incidentId) {
      return;
    }

    tryToAddChatContextFile(selectedValue, incidentId);
  };

  const handleTryScanningAgainButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TRY_SCANNING_AGAIN_BUTTON_CLICKED
    );
    window.location.reload();
  };

  // const handleGetDigmaButtonClick = () => {
  //   sendUserActionTrackingEvent(trackingEvents.GET_DIGMA_BUTTON_CLICKED);
  //   window.open(
  //     JETBRAINS_MARKETPLACE_PLUGIN_URL,
  //     "_blank",
  //     "noopener noreferrer"
  //   );
  // };

  useEffect(() => {
    async function initialScan() {
      await tryToScanRunningIdeProjects();
    }

    void initialScan();
  }, [tryToScanRunningIdeProjects]);

  const renderContent = () => {
    if (!incidentId) {
      return (
        <TextContainer>
          <Title>Incident ID is not provided</Title>
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

    if (isAddingChatContextFileInProgress) {
      return (
        <TextContainer>
          <Title>Adding the incident details to the IDE chat context</Title>
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
              click the <EmphasizedText>Try again</EmphasizedText> button.
            </Subtitle>
          </TextContainer>
          <ButtonsContainer>
            <NewButton
              label={"Try again"}
              onClick={handleTryScanningAgainButtonClick}
              buttonType={"secondary"}
            />
            {/* <NewButton
              label={"Get Digma"}
              onClick={handleGetDigmaButtonClick}
            /> */}
          </ButtonsContainer>
        </>
      );
    }

    if (selectItems.length > 1) {
      return (
        <>
          <TextContainer>
            <Title>
              Select the IDE project to add the incident details to the chat
              context
            </Title>
          </TextContainer>
          <IdeProjectSelect
            items={selectItems}
            onChange={(value) => void handleSelectChange(value)}
          />
        </>
      );
    }
  };

  return <>{renderContent()}</>;
};
