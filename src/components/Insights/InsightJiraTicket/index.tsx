import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { getFeatureFlagValue } from "../../../featureFlags";
import { FeatureFlag } from "../../../types";
import { isValidHttpUrl } from "../../../utils/isValidUrl";
import { ConfigContext } from "../../common/App/ConfigContext";
import { JiraTicket } from "../../common/JiraTicket";
import { actions } from "../actions";
import { InsightJiraTicketProps, LinkTicketResponse } from "./types";

export const InsightJiraTicket = (props: InsightJiraTicketProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [ticketLink, setTicketLink] = useState<string | null>(
    props.relatedInsight?.ticketLink ?? props.insight.ticketLink
  );
  const config = useContext(ConfigContext);

  const isLinkUnlinkInputVisible = Boolean(
    getFeatureFlagValue(config, FeatureFlag.IS_INSIGHT_TICKET_LINKAGE_ENABLED)
  );

  const linkTicket = (link: string) => {
    setTicketLink(link);
    if (link && isValidHttpUrl(link)) {
      window.sendMessageToDigma({
        action: actions.LINK_TICKET,
        payload: {
          codeObjectId:
            props.relatedInsight?.codeObjectId ??
            props.insight.prefixedCodeObjectId,
          insightType: props.relatedInsight?.type ?? props.insight.type,
          ticketLink: link
        }
      });
    } else {
      setErrorMessage("");
    }
  };

  const unlinkTicket = () => {
    window.sendMessageToDigma({
      action: actions.UNLINK_TICKET,
      payload: {
        codeObjectId:
          props.relatedInsight?.codeObjectId ??
          props.insight.prefixedCodeObjectId,
        insightType: props.relatedInsight?.type ?? props.insight.type
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

      window.sendMessageToDigma({
        action: actions.GET_DATA
      });

      props.onReloadSpanInsight && props.onReloadSpanInsight();
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
  }, []);

  useEffect(() => {
    if (props.relatedInsight) {
      setTicketLink(props.relatedInsight.ticketLink);
    }
  }, [props.relatedInsight]);

  return (
    <JiraTicket
      description={props.description}
      summary={props.summary}
      attachment={props.attachment}
      onClose={props.onClose}
      ticketLink={{ link: ticketLink, errorMessage }}
      unlinkTicket={unlinkTicket}
      linkTicket={linkTicket}
      showLinkButton={isLinkUnlinkInputVisible}
    />
  );
};
