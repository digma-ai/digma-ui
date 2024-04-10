import { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { EnvironmentName } from "../../common/EnvironmentName";
import { TableInsightStatusBadge } from "../../common/TableInsightStatusBadge";
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
      cell: (info) => {
        const environmentData = info.getValue();
        return (
          <EnvironmentName
            name={environmentData.environmentName}
            criticality={environmentData.criticality}
          />
        );
      }
    }),
    ...columns,
    columnHelper.accessor((x) => x.insightStatus, {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return <TableInsightStatusBadge status={status} />;
      }
    })
  ];
};
