import { ReactElement } from "react";
import { InsightType } from "../../../../types";
import { intersperse } from "../../../../utils/intersperse";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { EndpointHighNumberOfQueriesInsight } from "../../types";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { useTicketDataSource } from "../common/useTicketDataSource";
import { InsightTicketProps } from "../types";

export const EndpointHighNumberOfQueriesInsightTicket = (
  props: InsightTicketProps<EndpointHighNumberOfQueriesInsight>
) => {
  const spanInfo = props.data.insight.spanInfo;
  const {
    commitInfos,
    spanInsight,
    isLoading: isInitialLoading
  } = useTicketDataSource<EndpointHighNumberOfQueriesInsight>(
    spanInfo,
    InsightType.EndpointHighNumberOfQueries
  );

  const renderDescription = () => {
    if (!spanInsight || !spanInsight.spanInfo) {
      return null;
    }

    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <div key={"title"}>Description</div>,
            <span
              key={"details"}
            >{`The endpoint ${spanInsight.spanInfo.displayName} is triggering an abnormally high number of queries.`}</span>,
            <span key={"text"}>
              Consider using joins/caching to reduce the overhead of the db
              roundtrip.
            </span>,
            <></>,
            <span
              key={"median"}
            >{`Number of queries (median): ${spanInsight.queriesCount}`}</span>,
            <div
              key={"typical"}
            >{`Typical for ${spanInsight.serviceName}: ${spanInsight.typicalCount}`}</div>,
            <CommitInfos
              key={"commitInfos"}
              commitInfos={commitInfos}
              insight={spanInsight || undefined}
            />,
            <DigmaSignature key={"digmaSignature"} />
          ],
          (i: number) => (
            <br key={`separator-${i}`} />
          )
        )}
      </>
    );
  };

  const onReloadSpanInsight = () => {
    spanInfo?.spanCodeObjectId &&
      window.sendMessageToDigma({
        action: actions.GET_SPAN_INSIGHT,
        payload: {
          spanCodeObjectId: spanInfo?.spanCodeObjectId,
          insightType: InsightType.EndpointHighNumberOfQueries
        }
      });
  };

  const summary = [
    "High number of queries detected ",
    spanInsight?.spanInfo?.displayName,
    spanInsight?.serviceName
  ]
    .filter(Boolean)
    .join(" - ");

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isInitialLoading
      }}
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
