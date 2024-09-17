import useDimensions from "react-cool-dimensions";
import { Input } from "squarify";
import { isNumber } from "../../../../typeGuards/isNumber";
import { TreeMap } from "../../../common/TreeMap";
import { TileData } from "../../../common/TreeMap/types";
import { ReportTimeMode } from "../ReportHeader/types";
import { getChangesSeverity, getRank } from "../utils";
import { ServiceTile } from "./ServiceTile";
import * as s from "./styles";
import { ChartProps } from "./types";

export const Chart = ({ data }: ChartProps) => {
  const { width, height, observe } = useDimensions();

  const viewMode: ReportTimeMode = data.some((service) =>
    isNumber(service.key.lastDays)
  )
    ? "changes"
    : "baseline";

  const transformedData = data.map((service) => ({
    ...service,
    impact: Math.trunc(service.impact * 100)
  }));

  const maxImpactScore = Math.max(...transformedData.map((x) => x.impact));

  const chartData: Input<TileData>[] = transformedData.map((service) => {
    const severity =
      viewMode === "baseline"
        ? getRank(maxImpactScore, service.impact)
        : getChangesSeverity(service.impact);

    return {
      id: service.key.service,
      value: service.impact,
      content: (
        <ServiceTile
          name={service.key.service}
          criticalIssuesCount={service.issues}
          impactScore={service.impact}
          severity={severity}
          viewMode={viewMode}
        />
      )
    };
  });

  return (
    <s.Container ref={observe}>
      <TreeMap data={chartData} padding={12} width={width} height={height} />
    </s.Container>
  );
};
