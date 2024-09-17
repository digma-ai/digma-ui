import { Tile } from "../../../../common/TreeMap/Tile";
import { ReportTimeMode } from "../../ReportHeader/types";
import * as s from "./styles";
import { TooltipKeyValue } from "./TooltipKeyValue";
import { ServiceTileProps } from "./types";

const getFormattedNumber = (viewMode: ReportTimeMode, value: number) =>
  `${viewMode === "changes" && value > 0 ? "+" : ""}${value}`;

export const ServiceTile = ({
  name,
  criticalIssuesCount,
  impactScore,
  severity,
  viewMode
}: ServiceTileProps) => {
  const formattedCriticalIssuesCount = getFormattedNumber(
    viewMode,
    criticalIssuesCount
  );
  const formattedImpactScore = getFormattedNumber(viewMode, impactScore);

  return (
    <Tile
      title={name}
      severity={severity}
      tooltip={
        <s.TooltipContent>
          <span>{name}</span>
          <TooltipKeyValue label={"Critical Issues"}>
            {formattedCriticalIssuesCount}
          </TooltipKeyValue>
          <TooltipKeyValue label={"Impact Score"}>
            {formattedImpactScore}
          </TooltipKeyValue>
        </s.TooltipContent>
      }
    >
      <span>
        <s.StatsMainNumber>{formattedCriticalIssuesCount}</s.StatsMainNumber>
        <span> | {formattedImpactScore}</span>
      </span>
    </Tile>
  );
};
