import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatEnvironmentName } from "../../../utils/formatEnvironmentName";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Card } from "../../common/v3/Card";
import { EmptyStateCard } from "../EmptyStateCard";
import { EnvironmentName } from "../common/EnvironmentName";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { TableTag } from "../common/TableTag";
import { handleEnvironmentTableRowClick } from "../handleEnvironmentTableRowClick";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentPerformanceData } from "./types";
import { usePerformanceData } from "./usePerformanceData";

export const Performance = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { data, getData } = usePerformanceData();
  const previousData = usePrevious(data);
  const config = useContext(ConfigContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const renderPerformanceCard = (data: EnvironmentPerformanceData[]) => {
    const columnHelper = createColumnHelper<EnvironmentPerformanceData>();

    const columns = [
      columnHelper.accessor((x) => x.environment, {
        header: "Env",
        cell: (info) => {
          const environment = info.getValue();
          const formattedName = formatEnvironmentName(environment);
          return <EnvironmentName name={formattedName} />;
        }
      }),
      columnHelper.accessor(
        (x) => x.percentiles.find((x) => x.percentile === 0.5),
        {
          header: "Median",
          cell: (info) => {
            const value = info.getValue();

            if (!value) {
              return null;
            }

            const durationString = getDurationString(value.currentDuration);
            return <TableTag title={durationString} content={durationString} />;
          }
        }
      ),
      columnHelper.accessor(
        (x) => x.percentiles.find((x) => x.percentile === 0.95),
        {
          header: "Slowest 5%",
          cell: (info) => {
            const value = info.getValue();

            if (!value) {
              return null;
            }

            const durationString = getDurationString(value.currentDuration);
            return <TableTag title={durationString} content={durationString} />;
          }
        }
      ),
      columnHelper.accessor((x) => x.lastSpanInstanceInfo, {
        header: "Last",
        cell: (info) => {
          const lastSpanInstanceInfo = info.getValue();

          if (!lastSpanInstanceInfo) {
            return null;
          }
          const value = formatTimeDistance(lastSpanInstanceInfo.startTime, {
            format: "short",
            withDescriptiveWords: false
          }).replace(" ", "");
          const title = new Date(lastSpanInstanceInfo.startTime).toString();

          return (
            <s.LastCallTableText title={title}>{value}</s.LastCallTableText>
          );
        }
      })
    ];

    const handleTableRowClick = (row: Row<EnvironmentPerformanceData>) => {
      sendUserActionTrackingEvent(
        trackingEvents.PERFORMANCE_CARD_TABLE_ROW_CLICKED
      );
      handleEnvironmentTableRowClick(
        config.environments,
        row.original.environment
      );
    };

    return (
      <Card
        header={<s.CardTitle>Performance</s.CardTitle>}
        content={
          <Table<EnvironmentPerformanceData>
            columns={columns}
            data={data}
            onRowClick={handleTableRowClick}
          />
        }
      />
    );
  };

  return (
    <Section title={"Performance"}>
      {data && data.length > 0 ? (
        renderPerformanceCard(data)
      ) : (
        <EmptyStateCard
          type={isInitialLoading ? "loading" : "noData"}
          text={
            isInitialLoading
              ? "Digma is collecting performance data"
              : "No performance data available"
          }
        />
      )}
    </Section>
  );
};
