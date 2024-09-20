import useDimensions from "react-cool-dimensions";
import { Input } from "squarify";
import { isNumber } from "../../../../typeGuards/isNumber";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { TreeMap } from "../../../common/TreeMap";
import { TileData } from "../../../common/TreeMap/types";
import { ReportTimeMode } from "../ReportHeader/types";
import { trackingEvents } from "../tracking";
import { getSeverity } from "../utils";
import { ServiceTile } from "./ServiceTile";
import * as s from "./styles";
import { ChartProps } from "./types";

export const Chart = ({
  data,
  onServiceSelected,
  scoreCriterion
}: ChartProps) => {
  const { width, height, observe } = useDimensions();

  const viewMode: ReportTimeMode = data.some((service) =>
    isNumber(service.key.lastDays)
  )
    ? "changes"
    : "baseline";

  const handSeeIssuesClick = (service: string) => {
    sendUserActionTrackingEvent(trackingEvents.HEATMAP_SEE_ISSUES_LINK_CLICKED);
    onServiceSelected(service);
  };

  const minScore = Math.min(...data.map((x) => x[scoreCriterion]));
  const maxScore = Math.max(...data.map((x) => x[scoreCriterion]));

  const chartData: Input<TileData>[] = data.map((service) => {
    const score = service[scoreCriterion];
    const severity = getSeverity(minScore, maxScore, score);

    return {
      id: service.key.service,
      value: service[scoreCriterion],
      content: (
        <ServiceTile
          name={service.key.service}
          criticalIssuesCount={service.issues}
          scoreCriterion={scoreCriterion}
          score={score}
          severity={severity}
          viewMode={viewMode}
          onIssuesClick={handSeeIssuesClick}
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
