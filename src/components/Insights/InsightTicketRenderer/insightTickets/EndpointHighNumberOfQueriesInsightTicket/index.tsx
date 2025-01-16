import type { ReactElement } from "react";
import { intersperse } from "../../../../../utils/intersperse";
import { DigmaSignature } from "../../../../common/DigmaSignature";
import type { EndpointHighNumberOfQueriesInsight } from "../../../types";
import { useCommitInfos } from "../common";
import { CommitInfos } from "../common/CommitInfos";
import { InsightJiraTicket } from "../common/InsightJiraTicket";
import type { InsightTicketProps } from "../types";

export const EndpointHighNumberOfQueriesInsightTicket = ({
  data,
  refreshInsights,
  onClose,
  environmentId
}: InsightTicketProps<EndpointHighNumberOfQueriesInsight>) => {
  const { commitInfos, isLoading } =
    useCommitInfos<EndpointHighNumberOfQueriesInsight>(data.insight);

  const renderDescription = () => {
    if (!data.insight?.spanInfo) {
      return null;
    }

    return (
      <>
        {intersperse<ReactElement, ReactElement>(
          [
            <div key={"title"}>Description</div>,
            <span
              key={"details"}
            >{`The endpoint ${data.insight.spanInfo.displayName} is triggering an abnormally high number of queries.`}</span>,
            <div key={"text"}>
              Consider using joins/caching to reduce the overhead of the db
              roundtrip.
            </div>,
            <span
              key={"median"}
            >{`Number of queries (median): ${data.insight.queriesCount}`}</span>,
            <div
              key={"typical"}
            >{`Typical for ${data.insight.serviceName}: ${data.insight.typicalCount}`}</div>,
            <CommitInfos
              key={"commitInfos"}
              commitInfos={commitInfos}
              insight={data.insight}
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

  const summary = [
    "High number of queries detected ",
    data.insight?.spanInfo?.displayName,
    data.insight?.serviceName
  ]
    .filter(Boolean)
    .join(" - ");

  return (
    <InsightJiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading
      }}
      insight={data.insight}
      onClose={onClose}
      refreshInsights={refreshInsights}
      environmentId={environmentId}
    />
  );
};
