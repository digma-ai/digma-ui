import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useAgenticSelector } from "../../../../../containers/Agentic/hooks";
import { useGetIncidentQuery } from "../../../../../redux/services/digma";
import type { IncidentIssue } from "../../../../../redux/services/types";
import { getIdeLauncherLinkForSpan } from "../../../../../utils/getIdeLauncherLinkForSpan";
import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { Tag } from "../../../../common/v3/Tag";
import { Tooltip } from "../../../../common/v3/Tooltip";
import {
  getTagType,
  InsightIcon
} from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightIcon";
import { getValueLabel } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightIcon/getValueLabel";
import type { ColumnMeta } from "../types";
import * as s from "./styles";

// const mockData: {
//   issues: {
//     type: InsightType;
//     spanUid: string;
//     criticality: number;
//   }[];
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

const columnHelper = createColumnHelper<IncidentIssue>();

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
    () =>
      data?.relatedIssues.filter((x) => Boolean(getInsightTypeInfo(x.type))) ??
      [],
    [data?.relatedIssues]
  );

  const columns = [
    columnHelper.accessor((x) => x, {
      header: "Issue",
      meta: {
        width: "80%"
      },
      cell: (info) => {
        const issue = info.getValue();
        const insightTypeInfo = getInsightTypeInfo(issue.type);

        if (!insightTypeInfo) {
          return null;
        }

        return (
          <s.IssueInfoContainer>
            <InsightIcon
              insightTypeInfo={insightTypeInfo}
              criticality={issue.criticality}
            />
            <Tooltip title={insightTypeInfo.label}>
              {issue.spanUid ? (
                <s.Link href={getIdeLauncherLinkForSpan(issue.spanUid)}>
                  {insightTypeInfo.label}
                </s.Link>
              ) : (
                <s.IssueTypeTitle>{insightTypeInfo.label}</s.IssueTypeTitle>
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
          <Tag title={issue.criticality} type={tagType} content={tagLabel} />
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
