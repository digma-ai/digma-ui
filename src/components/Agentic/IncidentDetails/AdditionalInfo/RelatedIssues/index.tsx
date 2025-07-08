import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../../hooks/useStableSearchParams";
import { useGetIncidentQuery } from "../../../../../redux/services/digma";
import type { GenericIncidentIssue } from "../../../../../redux/services/types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { getWebAdminLinkForSpan } from "../../../../../utils/getWebAdminLinkForSpan";
import { getWebAdminLinkForError } from "../../../../../utils/getWebAdminLinkToError";
import { roundTo } from "../../../../../utils/roundTo";
import type { TagType } from "../../../../common/v3/Tag/types";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { getTagType as getErrorTagType } from "../../../../Errors/Score";
import {
  getTagType as getIssueTagType,
  InsightIcon
} from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightIcon";
import { getValueLabel } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightIcon/getValueLabel";
import { trackingEvents } from "../../../tracking";
import { Table } from "../Table";
import * as s from "./styles";

const getErrorTagLabel = (tagType: TagType): string => {
  switch (tagType) {
    case "lowSeverity":
      return "Low";
    case "mediumSeverity":
      return "Medium";
    case "highSeverity":
      return "High";
    default:
      return "";
  }
};

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const columnHelper = createColumnHelper<GenericIncidentIssue>();

export const RelatedIssues = () => {
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");

  const { data } = useGetIncidentQuery(
    {
      id: incidentId ?? ""
    },
    {
      skip: !incidentId,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  const issues = useMemo(
    () =>
      [...(data?.related_issues ?? [])].sort(
        (a, b) => b.criticality - a.criticality
      ),
    [data?.related_issues]
  );

  const columns = [
    columnHelper.accessor((x) => x, {
      header: "Issue",
      meta: {
        width: "80%"
      },
      cell: (info) => {
        const issue = info.getValue();

        const handleIssueLinkClick = () => {
          sendUserActionTrackingEvent(
            trackingEvents.INCIDENT_RELATED_ISSUES_TABLE_ITEM_LINK_CLICKED,
            {
              agentId: agentId ?? ""
            }
          );
        };

        switch (issue.type) {
          case "issue": {
            const insightTypeInfo = getInsightTypeInfo(issue.issue_type);
            const label = insightTypeInfo?.label;

            return (
              <s.IssueInfoContainer>
                {insightTypeInfo && (
                  <InsightIcon
                    insightTypeInfo={insightTypeInfo}
                    criticality={issue.criticality}
                  />
                )}
                <Tooltip title={label}>
                  {issue.span_uid ? (
                    <s.Link
                      onClick={handleIssueLinkClick}
                      href={getWebAdminLinkForSpan(issue.span_uid)}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      {label}
                    </s.Link>
                  ) : (
                    <s.IssueTypeTitle>{label}</s.IssueTypeTitle>
                  )}
                </Tooltip>
              </s.IssueInfoContainer>
            );
          }
          case "error": {
            const label = issue.issue_type;

            return (
              <s.IssueInfoContainer>
                <Tooltip title={label}>
                  <s.Link
                    onClick={handleIssueLinkClick}
                    href={getWebAdminLinkForError(issue.issue_id)}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                  >
                    {label}
                  </s.Link>
                </Tooltip>
              </s.IssueInfoContainer>
            );
          }
        }
      }
    }),
    columnHelper.accessor((x) => x, {
      header: "Criticality",
      meta: {
        width: "20%",
        textAlign: "center"
      },
      cell: (info) => {
        const issue = info.getValue();

        switch (issue.type) {
          case "issue": {
            const tagLabel = getValueLabel(issue.criticality);

            return (
              <s.CriticalityTag
                title={`${roundTo(issue.criticality * 100, 0)}%`}
                type={getIssueTagType(tagLabel)}
                content={<s.CriticalityLabel>{tagLabel}</s.CriticalityLabel>}
              />
            );
          }
          case "error": {
            const tagType = getErrorTagType(issue.criticality);

            return (
              <s.CriticalityTag
                title={issue.criticality}
                type={tagType}
                content={
                  <s.CriticalityLabel>
                    {getErrorTagLabel(tagType)}
                  </s.CriticalityLabel>
                }
              />
            );
          }
        }
      }
    })
  ];

  return (
    <s.Container>
      <Table data={issues} columns={columns} />
    </s.Container>
  );
};
