import squarify from "squarify";
import { isNull } from "../../../typeGuards/isNull";
import { TreeMapProps } from "./types";

export const TreeMap = ({ padding = 0, data, width, height }: TreeMapProps) => {
  const container = { x0: 0, y0: 0, x1: width, y1: height };

  const dataMax = Math.max(...data.map((item) => item.value));
  const minNormalizedValue = dataMax > 0 ? dataMax * 0.05 : 1;
  const normalizedData = data.map((item, index) => {
    return {
      id: index,
      value: item.value < minNormalizedValue ? minNormalizedValue : item.value,
      content: item.content
    };
  });
  const sortedData = [...normalizedData].sort((a, b) => b.value - a.value);
  const tiles = squarify(sortedData, container);

  // Transform coordinates to add paddings between tiles
  const transformedTiles = padding
    ? tiles.map((tile) => {
        const isLeftEdge = tile.x0 === 0;
        const isTopEdge = tile.y0 === 0;
        const isRightEdge = tile.x1 - width < 1;
        const isBottomEdge = tile.y1 - height < 1;

        return {
          ...tile,
          x0: isLeftEdge ? tile.x0 : tile.x0 + padding,
          y0: isTopEdge ? tile.y0 : tile.y0 + padding,
          x1: isRightEdge ? tile.x1 : tile.x1 - padding,
          y1: isBottomEdge ? tile.y1 : tile.y1 - padding
        };
      })
    : tiles;

  return (
    <div
      style={{
        position: "relative",
        width,
        height
      }}
    >
      {[width, height].some(isNull)
        ? null
        : transformedTiles.map((tile) => {
            return (
              <div
                key={tile.id}
                style={{
                  position: "absolute",
                  left: tile.x0,
                  top: tile.y0,
                  width: tile.x1 - tile.x0,
                  height: tile.y1 - tile.y0,
                  overflow: "hidden"
                }}
              >
                {tile.content}
              </div>
            );
          })}
    </div>
  );
};
