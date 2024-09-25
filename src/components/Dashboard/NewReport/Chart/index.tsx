import useDimensions from "react-cool-dimensions";
import { Input } from "squarify";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { TreeMap } from "../../../common/TreeMap";
import { TileData } from "../../../common/TreeMap/types";
import { trackingEvents } from "../tracking";
import { ServiceTile } from "./ServiceTile";
import * as s from "./styles";
import { ChartProps } from "./types";

export const Chart = ({
  data,
  onTitleClick,
  onIssuesStatsClick,
  scoreCriterion,
  timeMode,
  viewLevel
}: ChartProps) => {
  const { width, height, observe } = useDimensions();

  const handleTitleClick = (value: string) => {
    onTitleClick(value);
  };

  const handleSeeIssuesClick = (service: string) => {
    sendUserActionTrackingEvent(trackingEvents.HEATMAP_SEE_ISSUES_LINK_CLICKED);
    onIssuesStatsClick(service);
  };

  const chartData: Input<TileData>[] = data.map((x) => {
    const score = x.score;

    return {
      id: x.id,
      value: score,
      content: (
        <ServiceTile
          name={x.name}
          criticalIssuesCount={x.criticalIssuesCount}
          scoreCriterion={scoreCriterion}
          score={score}
          severity={x.severity}
          viewMode={timeMode}
          onIssuesClick={handleSeeIssuesClick}
          onTitleClick={viewLevel === "services" ? handleTitleClick : undefined}
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
