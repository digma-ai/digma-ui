import type { MouseEvent } from "react";
import type { IssuesReportTimeMode } from "../../../../../redux/slices/issuesReportSlice";
import { Tile } from "../../../TreeMap/Tile";
import * as s from "./styles";
import { TooltipKeyValue } from "./TooltipKeyValue";
import type { ReportTileProps } from "./types";

const getFormattedNumber = (timeMode: IssuesReportTimeMode, value: number) =>
  `${timeMode === "changes" && value > 0 ? "+" : ""}${value}`;

export const ReportTile = ({
  name,
  criticalIssuesCount,
  scoreCriterion,
  score,
  severity,
  timeMode,
  onTitleClick,
  onIssuesClick,
  isActive
}: ReportTileProps) => {
  const formattedCriticalIssuesCount = getFormattedNumber(
    timeMode,
    criticalIssuesCount
  );
  const formattedScore = getFormattedNumber(timeMode, score);

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
      isActive={isActive}
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
