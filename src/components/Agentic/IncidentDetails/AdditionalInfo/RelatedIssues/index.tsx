import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useAgenticSelector } from "../../../../../containers/Agentic/hooks";
import { useGetIncidentQuery } from "../../../../../redux/services/digma";
import type { GenericIncidentIssue } from "../../../../../redux/services/types";
import { getIdeLauncherLinkForSpan } from "../../../../../utils/getIdeLauncherLinkForSpan";
import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { Tooltip } from "../../../../common/v3/Tooltip";
import {
  getTagType,
  InsightIcon
} from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightIcon";
import { getValueLabel } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightIcon/getValueLabel";
import type { ColumnMeta } from "../types";
import * as s from "./styles";
import { isErrorIncidentIssue, isInsightIncidentIssue } from "./typeGuards";

// const mockData: {
//   issues: IncidentIssue[];
// } = {
//   issues: [
//     {
//       type: InsightType.EndpointBottleneck,
//       spanUid: "span-456",
//       criticality: 1
//     },
//     {
//       type: InsightType.SlowEndpoint,
//       spanUid: "span-012",
//       criticality: 0.2
//     },
//     {
//       type: InsightType.EndpointChattyApiV2,
//       spanUid: "span-678",
//       criticality: 0.3
//     }
//   ]
// };

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const columnHelper = createColumnHelper<GenericIncidentIssue>();

export const RelatedIssues = () => {
  const incidentId = useAgenticSelector((state) => state.incidents.incidentId);
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
    () => data?.related_issues ?? [],
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
        const insightTypeInfo = isInsightIncidentIssue(issue)
          ? getInsightTypeInfo(issue.issue_type)
          : undefined;

        const label = isInsightIncidentIssue(issue)
          ? insightTypeInfo?.label
          : isErrorIncidentIssue(issue)
          ? issue.issue_type
          : undefined;

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
                <s.Link href={getIdeLauncherLinkForSpan(issue.span_uid)}>
                  {label}
                </s.Link>
              ) : (
                <s.IssueTypeTitle>{label}</s.IssueTypeTitle>
              )}
            </Tooltip>
          </s.IssueInfoContainer>
        );
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
        const tagLabel = getValueLabel(issue.criticality);
        const tagType = getTagType(tagLabel);

        return (
          <s.CriticalityTag
            title={issue.criticality}
            type={tagType}
            content={<s.CriticalityLabel>{tagLabel}</s.CriticalityLabel>}
          />
        );
      }
    })
  ];

  const table = useReactTable({
    data: issues,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <s.Container>
      <s.Table>
        <s.TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <s.TableHeadRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as ColumnMeta;

                return (
                  <s.TableHeaderCell
                    key={header.id}
                    style={{
                      width: meta.width
                    }}
                    $align={meta.textAlign}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </s.TableHeaderCell>
                );
              })}
            </s.TableHeadRow>
          ))}
        </s.TableHead>
        <s.TableBody>
          {table.getRowModel().rows.map((row) => (
            <s.TableBodyRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta as ColumnMeta;

                return (
                  <s.TableBodyCell
                    key={cell.id}
                    $align={meta.textAlign}
                    style={{
                      width: meta.width
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </s.TableBodyCell>
                );
              })}
            </s.TableBodyRow>
          ))}
        </s.TableBody>
      </s.Table>
    </s.Container>
  );
};
