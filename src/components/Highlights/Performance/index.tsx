import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { formatEnvironmentName } from "../../../utils/formatEnvironmentName";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
import { PercentileDurations } from "../../Insights/types";
import { ConfigContext } from "../../common/App/ConfigContext";
import {
  DurationChange,
  isChangeMeaningfulEnough
} from "../../common/DurationChange";
import { Card } from "../../common/v3/Card";
import { EmptyStateCard } from "../EmptyStateCard";
import { handleEnvironmentTableRowClick } from "../TopIssues/highlightCards/goToEnvironmentIssues";
import { EnvironmentName } from "../common/EnvironmentName";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
import { TableTag } from "../common/TableTag";
import * as s from "./styles";
import { EnvironmentPerformanceData } from "./types";
import { usePerformanceData } from "./usePerformanceData";

const renderTableDurationChange = (data?: PercentileDurations) => {
  if (!data) {
    return null;
  }

  if (
    data.previousDuration &&
    data.changeTime &&
    isChangeMeaningfulEnough(
      data.currentDuration,
      data.previousDuration,
      data.changeTime
    )
  ) {
    return (
      <DurationChange
        currentDuration={data.currentDuration}
        previousDuration={data.previousDuration}
        changeTime={data.changeTime}
        showArrow={false}
        tooltipType={"durationDifference"}
      />
    );
  }

  const durationString = getDurationString(data.currentDuration);
  return <TableTag title={durationString} content={durationString} />;
};

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

            return renderTableDurationChange(value);
          }
        }
      ),
      columnHelper.accessor(
        (x) => x.percentiles.find((x) => x.percentile === 0.95),
        {
          header: "Slowest 5%",
          cell: (info) => {
            const value = info.getValue();

            return renderTableDurationChange(value);
          }
        }
      ),
      columnHelper.accessor((x) => x.lastSpanInstanceInfo, {
        header: "Last",
        cell: (info) => {
          const lastSpanInstanceInfo = info.getValue();
          const value = lastSpanInstanceInfo
            ? formatTimeDistance(lastSpanInstanceInfo?.startTime, {
                format: "short",
                withDescriptiveWords: false
              }).replace(" ", "")
            : "";
          return value ? (
            <s.LastCallTableText title={value}>{value}</s.LastCallTableText>
          ) : null;
        }
      })
    ];

    const handleTableRowClick = (row: Row<EnvironmentPerformanceData>) => {
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
