import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { InsightStatusBadge } from "../../../Insights/common/InsightCard/InsightHeader/InsightStatusBadge";
import { EnvironmentName } from "../../EnvironmentName";
import { EnvironmentData } from "../types";

export const addEnvironmentColumns = <
  T extends { id: string; value: unknown }[]
>(
  columnHelper: ColumnHelper<EnvironmentData<T>>,
  columns: ColumnDef<EnvironmentData<T>, any>[]
) => {
  return [
    columnHelper.accessor((x) => x, {
      header: "Env",
      meta: {
        width: "20%",
        minWidth: 60
      },
      cell: (info) => {
        const environmentData = info.getValue();
        return <EnvironmentName data={environmentData} />;
      }
    }),
    ...columns,
    columnHelper.accessor((x) => x.insightStatus, {
      header: "Status",
      meta: {
        width: "20%",
        minWidth: 60
      },
      cell: (info) => {
        const status = info.getValue();
        return <InsightStatusBadge status={status} />;
      }
    })
  ];
};
