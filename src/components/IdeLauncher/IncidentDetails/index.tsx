import { formatISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetIncidentQuery } from "../../../redux/services/digma";
import type { GetIncidentResponse } from "../../../redux/services/types";
import { isString } from "../../../typeGuards/isString";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import {
  Subtitle,
  TextContainer,
  Title
} from "../../common/GenericPageLayout/styles";
import { NewButton } from "../../common/v3/NewButton";
import type { SelectItem } from "../../common/v3/Select/types";
import { IdeProjectSelect } from "../common/IdeProjectSelect";
import { getSelectItemValue } from "../common/IdeProjectSelect/utils/getSelectedItemValue";
import { parseSelectedItemValue } from "../common/IdeProjectSelect/utils/parseSelectedItemValue";
import { scanRunningVSCodeIdeProjects } from "../scanRunningVSCodeIdeProjects";
import { ButtonsContainer, EmphasizedText } from "../styles";
import { trackingEvents } from "../tracking";
import type { AddChatContextFileResult } from "../types";
import { addChatContextFile } from "./addChatContextFile";

export const IncidentDetails = () => {
  const params = useParams();
  const incidentId = params.id;
  const [selectItems, setSelectItems] = useState<SelectItem[]>();
  const [isIdeProjectScanningInProgress, setIsIdeProjectScanningInProgress] =
    useState(false);
  const [
    isAddingChatContextFileInProgress,
    setAddingChatContextFileInProgress
  ] = useState(false);
  const [addChatContextFileResult, setAddChatContextFileResult] =
    useState<AddChatContextFileResult>();

  const {
    data: incidentData,
    isLoading,
    error
  } = useGetIncidentQuery(
    { id: incidentId ?? "" },
    {
      skip: !incidentId
    }
  );

  const tryToAddChatContextFile = useCallback(
    async (
      port: number,
      incidentId: string,
      incidentData: GetIncidentResponse
    ) => {
      setAddChatContextFileResult(undefined);
      setAddingChatContextFileInProgress(true);
      const result = await addChatContextFile(port, {
        name: `incident-${incidentId}-${formatISO(new Date(), { format: "basic" })}.json`,
        content: JSON.stringify(incidentData, null, 2)
      });
      sendTrackingEvent(trackingEvents.IDE_CHAT_CONTEXT_FILE_RESULT_RECEIVED, {
        result
      });
      setAddChatContextFileResult(result);
      setAddingChatContextFileInProgress(false);
    },
    []
  );

  const tryToScanRunningIdeProjects = useCallback(async () => {
    setSelectItems(undefined);
    setIsIdeProjectScanningInProgress(true);
    const result = await scanRunningVSCodeIdeProjects();
    setIsIdeProjectScanningInProgress(false);

    setSelectItems(
      result.map((x, i) => ({
        label: `${x.response.ideName} (${x.response.workspace})`,
        description: `${x.response.ideName} (${x.response.workspace})`,
        value: getSelectItemValue(x.port, x.response.workspace),
        enabled: true,
        selected: result.length === 1 && i === 0
      }))
    );
  }, []);

  useEffect(() => {
    if (selectItems && selectItems.length === 1 && incidentId && incidentData) {
      void tryToAddChatContextFile(
        parseSelectedItemValue(selectItems[0].value).port,
        incidentId,
        incidentData
      );
    }
  }, [incidentId, incidentData, tryToAddChatContextFile, selectItems]);

  const handleSelectChange = async (value: string | string[]) => {
    sendUserActionTrackingEvent(trackingEvents.IDE_PROJECT_SELECTED);
    const selectedValue = isString(value) ? value : value[0];
    const { port } = parseSelectedItemValue(selectedValue);

    if (!selectItems) {
      return;
    }

    setSelectItems(
      selectItems.map((item) => ({
        ...item,
        selected: item.value === selectedValue
      }))
    );

    if (!incidentId || !incidentData) {
      return;
    }

    await tryToAddChatContextFile(port, incidentId, incidentData);
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

    if (!incidentId || !incidentData) {
      return;
    }

    const { port } = parseSelectedItemValue(selectedItemValue);
    await tryToAddChatContextFile(port, incidentId, incidentData);
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

    if (!incidentData && isLoading) {
      return (
        <TextContainer>
          <Title>Getting incident details</Title>
        </TextContainer>
      );
    }

    if (!incidentData && error) {
      return (
        <TextContainer>
          <Title>Failed to get incident details</Title>
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

    if (addChatContextFileResult?.result === "failure") {
      return (
        <>
          <TextContainer>
            <Title>
              There was an issue adding the incident details to the IDE chat
              context
            </Title>
            <Subtitle>
              Please check that IDE is running and click the{" "}
              <EmphasizedText>Try again</EmphasizedText> button below.
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

    if (addChatContextFileResult?.result === "success") {
      return (
        <TextContainer>
          <Title>
            Incident details have been added to the IDE chat context
          </Title>
          <Subtitle>You can close this tab.</Subtitle>
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
