import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../../../dispatcher";
import { getFeatureFlagValue } from "../../../../../featureFlags";
import { FeatureFlag } from "../../../../../types";
import { isValidHttpUrl } from "../../../../../utils/isValidUrl";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { JiraTicket } from "../../../../common/JiraTicket";
import { actions } from "../../../actions";
import {
  InsightJiraTicketProps,
  InsightsGetDataListQuery,
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
  onClose
}: InsightJiraTicketProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [ticketLink, setTicketLink] = useState<string | null>(
    relatedInsight?.ticketLink ?? insight.ticketLink
  );
  const config = useContext(ConfigContext);

  const isLinkUnlinkInputVisible = Boolean(
    getFeatureFlagValue(config, FeatureFlag.IS_INSIGHT_TICKET_LINKAGE_ENABLED)
  );

  const linkTicket = (link: string) => {
    setTicketLink(link);
    if (link && isValidHttpUrl(link)) {
      window.sendMessageToDigma<LinkTicketPayload>({
        action: actions.LINK_TICKET,
        payload: {
          insightId: relatedInsight?.id || insight.id,
          insightType: relatedInsight?.type || insight.type,
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
        insightId: relatedInsight?.id || insight.id,
        insightType: relatedInsight?.type || insight.type
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

      config.state?.insights?.query &&
        window.sendMessageToDigma<InsightsGetDataListQuery>({
          action: actions.GET_DATA_LIST,
          payload: { query: config.state.insights.query }
        });

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
  }, [config.state?.insights?.query, onReloadSpanInsight]);

  useEffect(() => {
    if (relatedInsight) {
      setTicketLink(relatedInsight.ticketLink);
    }
  }, [relatedInsight]);

  return (
    <JiraTicket
      description={description}
      summary={summary}
      attachments={attachments || []}
      onClose={onClose}
      ticketLink={{ link: ticketLink, errorMessage }}
      unlinkTicket={unlinkTicket}
      linkTicket={linkTicket}
      showLinkButton={isLinkUnlinkInputVisible}
    />
  );
};
