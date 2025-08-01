import type { UIEvent } from "react";
import { useEffect, useState } from "react";
import useDimensions from "react-cool-dimensions";
import type { Input } from "squarify";
import { useScrollbarDimensions } from "../../../../hooks/useScrollbarDimensions";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { TreeMap } from "../../TreeMap";
import type { TileData } from "../../TreeMap/types";
import { trackingEvents } from "../tracking";
import { ReportTile } from "./ReportTile";
import * as s from "./styles";
import type { ChartProps } from "./types";

export const Chart = ({
  data,
  onTitleClick,
  onIssuesStatsClick,
  scoreCriterion,
  timeMode,
  viewLevel,
  activeTileIds
}: ChartProps) => {
  const { width, height, entry, observe } = useDimensions();
  const [isLeftOverlayVisible, setIsLeftOverlayVisible] = useState(false);
  const [isRightOverlayVisible, setIsRightOverlayVisible] = useState(false);
  const scrollbar = useScrollbarDimensions();

  useEffect(() => {
    if (entry) {
      setIsLeftOverlayVisible(entry.target.scrollLeft > 0);

      setIsRightOverlayVisible(
        entry.target.scrollWidth > width &&
          entry.target.scrollLeft + width !== entry.target.scrollWidth
      );
    }
  }, [width, entry]);

  const chartData: Input<TileData>[] = data.map((x) => {
    const score = x.score;

    const handleTitleClick = () => {
      sendUserActionTrackingEvent(trackingEvents.HEATMAP_TILE_TITLE_CLICKED, {
        view: viewLevel
      });
      onTitleClick(x.id);
    };

    const handleSeeIssuesClick = () => {
      sendUserActionTrackingEvent(
        trackingEvents.HEATMAP_SEE_ISSUES_LINK_CLICKED,
        {
          view: viewLevel
        }
      );
      onIssuesStatsClick(x.id);
    };

    return {
      id: x.id,
      value: score,
      content: (
        <ReportTile
          viewLevel={viewLevel}
          isActive={activeTileIds ? activeTileIds.includes(x.id) : undefined}
          name={x.name}
          criticalIssuesCount={x.criticalIssuesCount}
          scoreCriterion={scoreCriterion}
          score={score}
          severity={
            data.length === 1 && x.criticalIssuesCount > 0 ? "Top" : x.severity
          }
          timeMode={timeMode}
          onIssuesClick={handleSeeIssuesClick}
          onTitleClick={viewLevel === "services" ? handleTitleClick : undefined}
        />
      )
    };
  });

  const handleContainerScroll = (e: UIEvent<HTMLDivElement>) => {
    setIsLeftOverlayVisible(e.currentTarget.scrollLeft > 0);
    setIsRightOverlayVisible(
      e.currentTarget.scrollWidth > width &&
        e.currentTarget.scrollLeft + e.currentTarget.clientWidth !==
          e.currentTarget.scrollWidth
    );
  };

  return (
    <s.Container>
      <s.ContentContainer ref={observe} onScroll={handleContainerScroll}>
        <TreeMap
          normalize={true}
          data={chartData}
          padding={12}
          width={width}
          height={height}
          minTileDimensions={{
            width: 148,
            height: 145
          }}
        />
      </s.ContentContainer>
      <s.Overlay
        $visible={isLeftOverlayVisible}
        $placement={"left"}
        style={{ bottom: scrollbar.height }}
      />
      <s.Overlay
        $visible={isRightOverlayVisible}
        $placement={"right"}
        style={{ bottom: scrollbar.height }}
      />
    </s.Container>
  );
};
