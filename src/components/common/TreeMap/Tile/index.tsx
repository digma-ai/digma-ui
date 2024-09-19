import useDimensions from "react-cool-dimensions";
import { Tooltip } from "../../v3/Tooltip";
import * as s from "./styles";
import { TileProps } from "./types";

const MIN_HEIGHT = 86; // in pixels
const MIN_WIDTH = 92; // in pixels
const MIN_HEIGHT_TO_SHOW_CHILDREN = MIN_HEIGHT + 40; // in pixels

export const Tile = ({ title, children, severity, tooltip }: TileProps) => {
  const { observe: observeContainer, entry: containerEntry } = useDimensions();

  const isContentVisible =
    containerEntry?.target &&
    containerEntry.target.clientHeight >= MIN_HEIGHT &&
    containerEntry.target.clientWidth >= MIN_WIDTH;

  const isChildrenVisible =
    isContentVisible &&
    containerEntry.target.clientHeight >= MIN_HEIGHT_TO_SHOW_CHILDREN;

  return (
    <s.Container ref={observeContainer}>
      <Tooltip title={tooltip} followCursor={true}>
        <s.TileContainer $severity={severity}>
          {isContentVisible && (
            <s.ContentContainer>
              <s.Title>{title}</s.Title>
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
