import { useEffect, useState } from "react";
import { dispatcher } from "../../../../../dispatcher";
import { isValidHttpUrl } from "../../../../../utils/isValidUrl";
import { JiraTicket } from "../../../../common/JiraTicket";
import { actions } from "../../../actions";
import {
  InsightJiraTicketProps,
  LinkTicketPayload,
  LinkTicketResponse,
  UnlinkTicketPayload
} from "./types";

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

  const linkTicket = (link: string) => {
    setTicketLink(link);
    if (link && isValidHttpUrl(link)) {
      window.sendMessageToDigma<LinkTicketPayload>({
        action: actions.LINK_TICKET,
        payload: {
          insightId: relatedInsight?.id ?? insight.id,
          insightType: relatedInsight?.type ?? insight.type,
          ticketLink: link
        }
      });
    } else {
      setErrorMessage("");
    }
  };

  const unlinkTicket = () => {
    window.sendMessageToDigma<UnlinkTicketPayload>({
      action: actions.UNLINK_TICKET,
      payload: {
        insightId: relatedInsight?.id ?? insight.id,
        insightType: relatedInsight?.type ?? insight.type
      }
    });
  };

  useEffect(() => {
    const handleInsightTicketLink = (data: unknown) => {
      const linkTicketResponse = data as LinkTicketResponse;

      if (linkTicketResponse.success) {
        setTicketLink(linkTicketResponse.ticketLink);
      } else {
        setErrorMessage(linkTicketResponse.message);
      }

      refreshInsights();

      onReloadSpanInsight && onReloadSpanInsight();
    };

    dispatcher.addActionListener(
      actions.SET_TICKET_LINK,
      handleInsightTicketLink
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_TICKET_LINK,
        handleInsightTicketLink
      );
    };
  }, [refreshInsights, onReloadSpanInsight]);

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
