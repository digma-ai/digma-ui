import copy from "copy-to-clipboard";
import { useRef, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { isString } from "../../../typeGuards/isString";
import { addPrefix } from "../../../utils/addPrefix";
import { downloadFile } from "../../../utils/downloadFile";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { CircleLoader } from "../../common/CircleLoader";
import { CircleLoaderColors } from "../../common/CircleLoader/types";
import { IconTag } from "../../common/IconTag";
import { Tooltip } from "../../common/Tooltip";
import { CopyIcon } from "../../common/icons/12px/CopyIcon";
import { CrossIcon } from "../../common/icons/12px/CrossIcon";
import { DownloadIcon } from "../../common/icons/12px/DownloadIcon";
import { PaperclipIcon } from "../../common/icons/12px/PaperclipIcon";
import { JiraLogoIcon } from "../../common/icons/16px/JiraLogoIcon";
import { AttachmentTag } from "./AttachmentTag";
import { Field } from "./Field";
import { IconButton } from "./IconButton";
import { TicketLinkButton } from "./TicketLinkButton";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import { JiraTicketProps } from "./types";

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

export const JiraTicket = (props: JiraTicketProps) => {
  const [downloadErrorMessage, setDownloadErrorMessage] = useState<string>();
  const descriptionContentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const prefixedTrackingEvents = addPrefix(
    props.tracking?.prefix || "",
    trackingEvents,
    " "
  );

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const copyToClipboard = (
    field: string,
    value: HTMLElement | null | string
  ) => {
    sendTrackingEvent(
      prefixedTrackingEvents.JIRA_TICKET_FIELD_COPY_BUTTON_CLICKED,
      {
        ...(props.tracking?.additionalInfo || {}),
        field
      }
    );

    if (value === null) {
      return;
    }

    if (isString(value)) {
      copy(value);
    } else {
      copy(value.innerText);
    }
  };

  const handleDownloadButtonClick = () => {
    sendTrackingEvent(
      prefixedTrackingEvents.JIRA_TICKET_ATTACHMENT_DOWNLOAD_BUTTON_CLICKED,
      { ...(props.tracking?.additionalInfo || {}) }
    );

    if (props.attachment) {
      downloadFile(props.attachment.url, props.attachment.fileName).catch(
        (e) => {
          const errorMessageString =
            e instanceof Error ? `Error: ${e.message}` : "";
          setDownloadErrorMessage(
            `Failed to download file.\n${errorMessageString}`
          );
        }
      );
    }
  };

  return (
    <s.Container>
      <s.TicketInfo>
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
          content={props.summary}
          button={
            <IconButton
              icon={CopyIcon}
              title={"Copy"}
              onClick={() => copyToClipboard("summary", props.summary)}
            />
          }
        />
        <Field
          key={"description"}
          label={"Description"}
          multiline={true}
          content={
            <div ref={descriptionContentRef}>
              {props.description.isLoading ? (
                <s.LoaderContainer>
                  <CircleLoader
                    size={32}
                    colors={getCircleLoaderColors(theme)}
                  />
                </s.LoaderContainer>
              ) : (
                props.description.content
              )}
            </div>
          }
          errorMessage={props.description.errorMessage}
          button={
            <IconButton
              icon={CopyIcon}
              title={"Copy"}
              disabled={props.description.isLoading}
              onClick={() =>
                copyToClipboard("description", descriptionContentRef.current)
              }
            />
          }
        />
        {props.attachment && (
          <Field
            key={"attachments"}
            label={"Attachments"}
            content={
              <AttachmentTag
                icon={PaperclipIcon}
                text={props.attachment.fileName}
              />
            }
            button={
              <IconButton
                icon={DownloadIcon}
                title={"Download"}
                onClick={handleDownloadButtonClick}
              />
            }
            errorMessage={downloadErrorMessage}
          />
        )}
      </s.TicketInfo>
      {props.showLinkButton && (
        <TicketLinkButton
          ticketLink={props.ticketLink}
          unlinkTicket={props.unlinkTicket}
          linkTicket={props.linkTicket}
        />
      )}
    </s.Container>
  );
};
