import { useEffect, useMemo, useState } from "react";
import {
  useLinkTicketToIssueMutation,
  useUnlinkTicketFromIssueMutation
} from "../../../../../../redux/services/digma";
import type { LinkTicketResponse } from "../../../../../../redux/services/types";
import { isValidHttpUrl } from "../../../../../../utils/isValidHttpUrl";
import { JiraTicket } from "../../../../../common/JiraTicket";
import type { InsightJiraTicketProps } from "./types";

export const InsightJiraTicket = ({
  insight,
  relatedInsight,
  description,
  summary,
  attachments,
  onClose
}: InsightJiraTicketProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const link = useMemo(
    () => relatedInsight?.ticketLink ?? insight.ticketLink,
    [relatedInsight?.ticketLink, insight.ticketLink]
  );
  const [ticketLink, setTicketLink] = useState<string | null>(link);
  const ticketLinkData = useMemo(
    () => ({
      link: ticketLink,
      errorMessage
    }),
    [ticketLink, errorMessage]
  );

  const [triggerLink] = useLinkTicketToIssueMutation();
  const [triggerUnlink] = useUnlinkTicketFromIssueMutation();

  const handleLinkUnlinkTicketResponse = (response: LinkTicketResponse) => {
    if (response.success) {
      setTicketLink(response.ticketLink);
    } else {
      setErrorMessage(response.message);
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
    setTicketLink(link);
  }, [link]);

  return (
    <JiraTicket
      description={description}
      summary={summary}
      attachments={attachments ?? []}
      onClose={onClose}
      ticketLink={ticketLinkData}
      unlinkTicket={unlinkTicket}
      linkTicket={linkTicket}
    />
  );
};
