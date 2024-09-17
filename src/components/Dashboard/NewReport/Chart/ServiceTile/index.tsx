import { Tile } from "../../../../common/TreeMap/Tile";
import * as s from "./styles";
import { TooltipKeyValue } from "./TooltipKeyValue";
import { ServiceTileProps } from "./types";

const getNumberSign = (value: number) => {
  if (value > 0) {
    return "+";
  }

  if (value < 0) {
    return "-";
  }

  return "";
};

export const ServiceTile = ({
  name,
  criticalIssuesCount,
  impactScore,
  severity,
  viewMode
}: ServiceTileProps) => (
  <Tile
    title={name}
    severity={severity}
    tooltip={
      <s.TooltipContent>
        <span>{name}</span>
        <TooltipKeyValue label={"Critical Issues"}>
          {viewMode === "changes" && getNumberSign(impactScore)}
          {criticalIssuesCount}
        </TooltipKeyValue>
        <TooltipKeyValue label={"Impact Score"}>{impactScore}</TooltipKeyValue>
      </s.TooltipContent>
    }
  >
    <span>
      <s.StatsMainNumber>{criticalIssuesCount}</s.StatsMainNumber>
      <span> | {impactScore}</span>
    </span>
  </Tile>
);
