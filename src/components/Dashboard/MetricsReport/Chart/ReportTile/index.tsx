import { MouseEvent } from "react";
import { Tile } from "../../../../common/TreeMap/Tile";
import { ReportTimeMode } from "../../types";
import * as s from "./styles";
import { TooltipKeyValue } from "./TooltipKeyValue";
import { ReportTileProps } from "./types";

const getFormattedNumber = (viewMode: ReportTimeMode, value: number) =>
  `${viewMode === "changes" && value > 0 ? "+" : ""}${value}`;

export const ReportTile = ({
  name,
  criticalIssuesCount,
  scoreCriterion,
  score,
  severity,
  viewMode,
  onTitleClick,
  onIssuesClick
}: ReportTileProps) => {
  const formattedCriticalIssuesCount = getFormattedNumber(
    viewMode,
    criticalIssuesCount
  );
  const formattedScore = getFormattedNumber(viewMode, score);

  const handleTitleClick = () => {
    if (onTitleClick) {
      onTitleClick();
    }
  };

  const handleIssuesLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onIssuesClick) {
      e.preventDefault();
      onIssuesClick();
    }
  };

  return (
    <Tile
      title={name}
      severity={severity}
      onTitleClick={onTitleClick ? handleTitleClick : undefined}
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
