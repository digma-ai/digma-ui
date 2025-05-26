import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { InsightType } from "../../../../../types";
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
import type { IncidentRelatedIssue } from "./types";

const mockData: {
  issues: {
    type: InsightType;
    spanUid: string;
    criticality: number;
  }[];
} = {
  issues: [
    {
      type: InsightType.EndpointBottleneck,
      spanUid: "span-456",
      criticality: 1
    },
    {
      type: InsightType.SlowEndpoint,
      spanUid: "span-012",
      criticality: 0.2
    },
    {
      type: InsightType.EndpointChattyApiV2,
      spanUid: "span-678",
      criticality: 0.3
    }
  ]
};

const columnHelper = createColumnHelper<IncidentRelatedIssue>();

export const RelatedIssues = () => {
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
          <s.IssueRow>
            <InsightIcon
              insightTypeInfo={insightTypeInfo}
              criticality={issue.criticality}
            />
            <Tooltip title={insightTypeInfo.label}>
              <s.Link href={getIdeLauncherLinkForSpan(issue.spanUid)}>
                {insightTypeInfo.label}
              </s.Link>
            </Tooltip>
          </s.IssueRow>
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
    data: mockData.issues,
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
