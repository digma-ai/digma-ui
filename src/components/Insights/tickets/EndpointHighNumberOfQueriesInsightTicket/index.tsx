import { ReactElement } from "react";
import { intersperse } from "../../../../utils/intersperse";
import { InsightJiraTicket } from "../../JiraTicket";
import { EndpointHighNumberOfQueriesInsight } from "../../types";
import { useCommitInfos } from "../common";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { InsightTicketProps } from "../types";

export const EndpointHighNumberOfQueriesInsightTicket = (
  props: InsightTicketProps<EndpointHighNumberOfQueriesInsight>
) => {
  const spanInsight = props.data.insight;
  const { commitInfos, isLoading } =
    useCommitInfos<EndpointHighNumberOfQueriesInsight>(spanInsight);

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
              insight={spanInsight}
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
    spanInsight?.spanInfo?.displayName,
    spanInsight?.serviceName
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
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
