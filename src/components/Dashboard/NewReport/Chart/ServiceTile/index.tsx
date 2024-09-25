import { MouseEvent } from "react";
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
  scoreCriterion,
  score,
  severity,
  viewMode,
  onTitleClick,
  onIssuesClick
}: ServiceTileProps) => {
  const formattedCriticalIssuesCount = getFormattedNumber(
    viewMode,
    criticalIssuesCount
  );
  const formattedScore = getFormattedNumber(viewMode, score);

  const handleTitleClick = () => {
    if (onTitleClick) {
      onTitleClick(name);
    }
  };

  const handleIssuesLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onIssuesClick) {
      e.preventDefault();
      onIssuesClick(name);
    }
  };

  return (
    <Tile
      title={name}
      severity={severity}
      onTitleClick={handleTitleClick}
      tooltip={
        <s.TooltipContent>
          <span>{name}</span>
          <TooltipKeyValue label={"Critical issues"}>
            {formattedCriticalIssuesCount}
          </TooltipKeyValue>
          <TooltipKeyValue label={`${scoreCriterion} score`}>
            {formattedScore}
          </TooltipKeyValue>
        </s.TooltipContent>
      }
    >
      <s.StyledLink href={"#"} onClick={handleIssuesLinkClick}>
        <span>
          {formattedCriticalIssuesCount} | {formattedScore}
        </span>
      </s.StyledLink>
    </Tile>
  );
};
