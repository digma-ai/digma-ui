import copy from "copy-to-clipboard";
import { useRef, useState } from "react";
import { useTheme } from "styled-components";
import type { DefaultTheme } from "styled-components/dist/types";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { addPrefix } from "../../../utils/addPrefix";
import { downloadFile } from "../../../utils/downloadFile";
import { CircleLoader } from "../../common/CircleLoader";
import type { CircleLoaderColors } from "../../common/CircleLoader/types";
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
import { Section } from "./Section";
import { TicketLinkButton } from "./TicketLinkButton";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type { JiraTicketProps } from "./types";

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

export const JiraTicket = ({
  tracking,
  onClose,
  description,
  summary,
  attachments,
  ticketLink,
  linkTicket,
  unlinkTicket
}: JiraTicketProps) => {
  const [downloadErrorMessage, setDownloadErrorMessage] = useState<string>();
  const descriptionContentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const prefixedTrackingEvents = addPrefix(
    tracking?.prefix ?? "",
    trackingEvents,
    ""
  );

  const handleCloseButtonClick = () => {
    onClose();
  };

  const copyToClipboard = (
    field: string,
    value: HTMLElement | null | string
  ) => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.JIRA_TICKET_FIELD_COPY_BUTTON_CLICKED,
      {
        ...(tracking?.additionalInfo ?? {}),
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

  const handleDownloadButtonClick = (attachment: {
    url: string;
    fileName: string;
  }) => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.JIRA_TICKET_ATTACHMENT_DOWNLOAD_BUTTON_CLICKED,
      { ...(tracking?.additionalInfo ?? {}) }
    );

    downloadFile(attachment.url, attachment.fileName).catch((e) => {
      const errorMessageString =
        e instanceof Error ? `Error: ${e.message}` : "";
      setDownloadErrorMessage(
        `Failed to download file.${
          errorMessageString.length > 1 ? `\n${errorMessageString}` : ""
        }`
      );
    });
  };

  const errorMessage = description.isLoading ? "" : description.errorMessage;

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
      <Section key={"summary"} title={"Summary"} selectable={false}>
        <Field
          button={
            <IconButton
              icon={CopyIcon}
              title={"Copy"}
              onClick={() => copyToClipboard("summary", summary)}
            />
          }
        >
          {summary}
        </Field>
      </Section>
      <Section
        key={"description"}
        title={"Description"}
        selectable={false}
        errorMessage={errorMessage}
      >
        <Field
          multiline={true}
          button={
            <IconButton
              icon={CopyIcon}
              title={"Copy"}
              disabled={description.isLoading}
              onClick={() =>
                copyToClipboard("description", descriptionContentRef.current)
              }
            />
          }
        >
          <div ref={descriptionContentRef}>
            {description.isLoading ? (
              <s.LoaderContainer>
                <CircleLoader size={32} colors={getCircleLoaderColors(theme)} />
              </s.LoaderContainer>
            ) : (
              description.content
            )}
          </div>
        </Field>
      </Section>
      {attachments.length > 0 && (
        <Section
          key={"attachments"}
          title={"Attachments"}
          errorMessage={downloadErrorMessage}
        >
          {attachments.map((attachment, i) => {
            return (
              <Field
                key={"attachment-" + i.toString()}
                button={
                  <IconButton
                    icon={DownloadIcon}
                    title={"Download"}
                    size={16}
                    onClick={() => handleDownloadButtonClick(attachment)}
                  />
                }
              >
                <AttachmentTag
                  icon={PaperclipIcon}
                  text={attachment.fileName}
                />
              </Field>
            );
          })}
        </Section>
      )}
      <TicketLinkButton
        ticketLink={ticketLink}
        unlinkTicket={unlinkTicket}
        linkTicket={linkTicket}
      />
    </s.Container>
  );
};
