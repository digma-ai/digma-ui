import { addPrefix } from "../../utils/addPrefix";

const TRACKING_PREFIX = "insights";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    JIRA_TICKET_INFO_BUTTON_CLICKED: "jira ticket info button clicked",
    JIRA_TICKET_FIELD_COPY_BUTTON_CLICKED:
      "jira ticket field copy button clicked",
    JIRA_TICKET_ATTACHMENT_DOWNLOAD_BUTTON_CLICKED:
      "jira ticket attachment download button clicked",
    JIRA_TICKET_HINT_CLOSED: "jira ticket hint closed"
  },
  " "
);
