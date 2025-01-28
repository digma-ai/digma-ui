import { useEffect, useState } from "react";
import {
  useLinkTicketToIssueMutation,
  useUnlinkTicketFromIssueMutation
} from "../../../../../../redux/services/digma";
import type { LinkTicketResponse } from "../../../../../../redux/services/types";
import { isValidHttpUrl } from "../../../../../../utils/isValidUrl";
import { JiraTicket } from "../../../../../common/JiraTicket";
import type { InsightJiraTicketProps } from "./types";

export const InsightJiraTicket = ({
  insight,
  relatedInsight,
  onReloadSpanInsight,
  description,
  summary,
  attachments,
  onClose,
  refreshInsights
}: InsightJiraTicketProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [ticketLink, setTicketLink] = useState<string | null>(
    relatedInsight?.ticketLink ?? insight.ticketLink
  );
  const [triggerLink] = useLinkTicketToIssueMutation();
  const [triggerUnlink] = useUnlinkTicketFromIssueMutation();

  const handleLinkUnlinkTicketResponse = (response: LinkTicketResponse) => {
    if (response.success) {
      setTicketLink(response.ticketLink);
    } else {
      setErrorMessage(response.message);
    }

    refreshInsights();

    if (onReloadSpanInsight) {
      onReloadSpanInsight();
    }
  };

  const linkTicket = (link: string) => {
    setTicketLink(link);
    if (link && isValidHttpUrl(link)) {
      void triggerLink({
        environment: insight.environment,
        insightId: relatedInsight?.id ?? insight.id,
        ticketLink: link
      })
        .unwrap()
        .then(handleLinkUnlinkTicketResponse)
        .catch((error: Error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("");
    }
  };

  const unlinkTicket = () => {
    void triggerUnlink({
      environment: insight.environment,
      insightId: relatedInsight?.id ?? insight.id
    })
      .unwrap()
      .then(handleLinkUnlinkTicketResponse)
      .catch((error: Error) => {
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    if (relatedInsight) {
      setTicketLink(relatedInsight.ticketLink);
    }
  }, [relatedInsight]);

  return (
    <JiraTicket
      description={description}
      summary={summary}
      attachments={attachments ?? []}
      onClose={onClose}
      ticketLink={{ link: ticketLink, errorMessage }}
      unlinkTicket={unlinkTicket}
      linkTicket={linkTicket}
    />
  );
};
