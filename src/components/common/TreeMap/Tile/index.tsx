import type { MouseEvent } from "react";
import useDimensions from "react-cool-dimensions";
import { Tooltip } from "../../v3/Tooltip";
import * as s from "./styles";
import type { TileProps } from "./types";

const MIN_HEIGHT = 86; // in pixels
const MIN_WIDTH = 92; // in pixels
const MIN_HEIGHT_TO_SHOW_CHILDREN = MIN_HEIGHT + 40; // in pixels

export const Tile = ({
  title,
  children,
  severity,
  tooltip,
  onTitleClick,
  isActive = true,
  className = ""
}: TileProps) => {
  const { observe: observeContainer, entry: containerEntry } = useDimensions();

  const isContentVisible =
    containerEntry?.target &&
    containerEntry.target.clientHeight >= MIN_HEIGHT &&
    containerEntry.target.clientWidth >= MIN_WIDTH;

  const isChildrenVisible =
    isContentVisible &&
    containerEntry.target.clientHeight >= MIN_HEIGHT_TO_SHOW_CHILDREN;

  const handleTitleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onTitleClick) {
      e.preventDefault();
      onTitleClick();
    }
  };

  const classNames = [className, "treemap-tile"].join(" ");

  return (
    <s.Container ref={observeContainer} className={classNames}>
      <Tooltip title={tooltip} followCursor={true}>
        <s.TileContainer $severity={severity} $isActive={isActive}>
          {isContentVisible && (
            <s.ContentContainer $isActive={isActive}>
              {onTitleClick ? (
                <s.TitleLink
                  href={"#"}
                  onClick={handleTitleClick}
                  className={"treemap-tile-title link"}
                >
                  {title}
                </s.TitleLink>
              ) : (
                <s.Title className={"treemap-tile-title"}>{title}</s.Title>
              )}
              {isChildrenVisible && (
                <s.ChildrenContainer>{children}</s.ChildrenContainer>
              )}
            </s.ContentContainer>
          )}
        </s.TileContainer>
      </Tooltip>
    </s.Container>
  );
};
