import axios, { AxiosResponse } from "axios";
import copy from "copy-to-clipboard";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { dispatcher } from "../../../dispatcher";
import { isString } from "../../../typeGuards/isString";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../common/App/ConfigContext";
import { CircleLoader } from "../../common/CircleLoader";
import { CircleLoaderColors } from "../../common/CircleLoader/types";
import { IconTag } from "../../common/IconTag";
import { Tooltip } from "../../common/Tooltip";
import { CopyIcon } from "../../common/icons/12px/CopyIcon";
import { CrossIcon } from "../../common/icons/12px/CrossIcon";
import { DownloadIcon } from "../../common/icons/12px/DownloadIcon";
import { PaperclipIcon } from "../../common/icons/12px/PaperclipIcon";
import { JiraLogoIcon } from "../../common/icons/16px/JiraLogoIcon";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { isSpanNPlusOneInsight } from "../typeGuards";
import { AttachmentTag } from "./AttachmentTag";
import { Field } from "./Field";
import { IconButton } from "./IconButton";
import * as s from "./styles";
import { CodeLocationsData, JiraTicketProps } from "./types";

const getCircleLoaderColors = (theme: DefaultTheme): CircleLoaderColors => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#fff"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#222326"
      };
  }
};

const getCriticalityLabel = (criticality: number) => {
  if (criticality === 0) {
    return "N/A";
  }

  if (criticality < 0.3) {
    return "Low";
  }

  if (criticality < 0.7) {
    return "Medium";
  }

  return "High";
};

export const JiraTicket = (props: JiraTicketProps) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const config = useContext(ConfigContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const theme = useTheme();

  let spanCodeObjectId: string | undefined;
  let methodCodeObjectId: string | undefined;

  let summary = "";
  let description = "";
  let traceId: string | null = null;
  const criticality = props.insight.criticality;

  const downloadFile = async (url: string, fileName: string) => {
    try {
      const response: AxiosResponse<Blob> = await axios.get(url, {
        responseType: "blob"
      });
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.setAttribute("href", href);
      link.setAttribute("download", fileName);
      link.click();
      URL.revokeObjectURL(href);
    } catch (e) {
      const errorMessageString =
        e instanceof Error ? `Error: ${e.message}` : "";
      setErrorMessage(`Failed to download file.\n${errorMessageString}`);
    }
  };

  if (isSpanNPlusOneInsight(props.insight)) {
    spanCodeObjectId = props.insight.spanInfo?.spanCodeObjectId;
    methodCodeObjectId =
      props.insight.spanInfo?.methodCodeObjectId || undefined;

    const services = [
      ...new Set(props.insight.endpoints.map((x) => x.endpointInfo.serviceName))
    ];

    const serviceString = services.length > 0 ? services.join(", ") : "";
    const criticalityString = `Criticality: ${getCriticalityLabel(
      criticality
    )}`;
    summary = ["N+1 Issue found", serviceString, criticalityString]
      .filter(Boolean)
      .join(" - ");

    const queryString = props.insight.spanInfo?.displayName || "";

    const codeLocationsString =
      codeLocations.length > 0
        ? ["Related code locations:", ...codeLocations].join("\n")
        : "";

    const endpointsDataString = props.insight.endpoints
      .map((x) =>
        [
          `• ${x.endpointInfo.serviceName} ${trimEndpointScheme(
            x.endpointInfo.route
          )}`,
          `  Repeats: ${x.occurrences} Criticality: ${getCriticalityLabel(
            x.criticality
          )}`
        ].join("\n")
      )
      .join("\n\n");

    const affectedEndpointsString =
      props.insight.endpoints.length > 0
        ? ["Affected endpoints:", endpointsDataString].join("\n")
        : "";

    description = [
      "N+1 Issue found",
      queryString,
      codeLocationsString,
      affectedEndpointsString,
      "info by digma.ai"
    ]
      .filter(Boolean)
      .join("\n\n");

    traceId = props.insight.traceId;
  }

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_CODE_LOCATIONS,
      payload: {
        spanCodeObjectId,
        methodCodeObjectId
      }
    });
    setIsInitialLoading(true);

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
      setIsInitialLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );
    };
  }, []);

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleDownloadButtonClick = () => {
    sendTrackingEvent(
      trackingEvents.JIRA_TICKET_ATTACHMENT_DOWNLOAD_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );

    if (traceId) {
      const url = `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`;
      void downloadFile(url, `trace-${traceId}.json`);
    }
  };

  const copyToClipboard = (field: string, value: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_FIELD_COPY_BUTTON_CLICKED, {
      insightType: props.insight.type,
      field
    });
    copy(value);
  };

  return (
    <s.Container>
      <s.Header>
        <IconTag icon={JiraLogoIcon} size={"large"} />
        <s.TitleContainer>
          <s.Title>Create Jira Ticket</s.Title>
          Bug details
        </s.TitleContainer>
        <Tooltip title={"Close"}>
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} />
          </s.CloseButton>
        </Tooltip>
      </s.Header>
      <Field
        key={"summary"}
        label={"Summary"}
        content={summary}
        button={
          <IconButton
            icon={CopyIcon}
            title={"Copy"}
            onClick={() => copyToClipboard("summary", summary)}
          />
        }
      />
      <Field
        key={"description"}
        label={"Description"}
        multiline={true}
        content={
          <>
            {isInitialLoading ? (
              <s.LoaderContainer>
                <CircleLoader size={32} colors={getCircleLoaderColors(theme)} />
              </s.LoaderContainer>
            ) : (
              description
            )}
          </>
        }
        button={
          <IconButton
            icon={CopyIcon}
            title={"Copy"}
            onClick={() => copyToClipboard("description", description)}
          />
        }
      />
      {isString(traceId) && config.isJaegerEnabled && config.jaegerURL && (
        <Field
          key={"attachments"}
          label={"Attachments"}
          content={
            <AttachmentTag
              icon={PaperclipIcon}
              text={`trace-${traceId}.json`}
            />
          }
          button={
            <IconButton
              icon={DownloadIcon}
              title={"Download"}
              onClick={handleDownloadButtonClick}
            />
          }
          errorMessage={errorMessage}
        />
      )}
    </s.Container>
  );
};
