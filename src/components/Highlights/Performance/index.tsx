import { Row, createColumnHelper } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getDurationString } from "../../../utils/getDurationString";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Card } from "../../common/v3/Card";
import { Tag } from "../../common/v3/Tag";
import { EmptyStateCard } from "../EmptyStateCard";
import { EnvironmentName } from "../common/EnvironmentName";
import { Section } from "../common/Section";
import { Table } from "../common/Table";
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
      columnHelper.accessor("environment", {
        header: "Env",
        cell: (info) => {
          const environment = info.getValue();
          return <EnvironmentName name={environment.name} />;
        }
      }),
      columnHelper.accessor((x) => x, {
        header: "Median",
        cell: (info) => {
          const value = info.getValue();
          const percentileData = value.p50;
          const durationString = getDurationString(percentileData.duration);
          const tagType = isBoolean(percentileData.isCritical)
            ? percentileData.isCritical
              ? "highSeverity"
              : "success"
            : undefined;

          return (
            <Tag
              title={durationString}
              content={durationString}
              type={tagType}
            />
          );
        }
      }),
      columnHelper.accessor((x) => x, {
        header: "Slowest 5%",
        cell: (info) => {
          const value = info.getValue();
          const percentileData = value.p95;
          const durationString = getDurationString(percentileData.duration);
          const tagType = isBoolean(percentileData.isCritical)
            ? percentileData.isCritical
              ? "highSeverity"
              : "success"
            : undefined;

          return (
            <Tag
              title={durationString}
              content={durationString}
              type={tagType}
            />
          );
        }
      }),
      columnHelper.accessor("lastCallTimeStamp", {
        header: "Last",
        cell: (info) => {
          const lastCallDateTime = info.getValue();

          if (!lastCallDateTime) {
            return null;
          }

          const value = formatTimeDistance(lastCallDateTime, {
            format: "short",
            withDescriptiveWords: false
          }).replace(" ", "");
          const title = new Date(lastCallDateTime).toString();

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
        row.original.environment.id,
        "/analytics"
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
      {data && data.performance.length > 0 ? (
        renderPerformanceCard(data.performance)
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
