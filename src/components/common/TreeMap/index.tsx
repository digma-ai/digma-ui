import type { ILayoutRect, Input } from "squarify";
import squarify from "squarify";
import { isNull } from "../../../typeGuards/isNull";
import type { TileData, TreeMapProps } from "./types";

const normalizeData = (data: Input<TileData>[]) => {
  if (data.length === 0) {
    return data;
  }

  const MIN_MAX_RATIO = 5;
  const NORMALIZED_MIN = 1;
  const NORMALIZED_MAX = MIN_MAX_RATIO;

  const values = data.map((item) => item.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);

  if (dataMin === dataMax) {
    return data.map((item) => ({
      ...item,
      value: NORMALIZED_MIN
    }));
  }

  return data.map((item) => ({
    id: item.id,
    value:
      ((Math.max(0, item.value) - dataMin) *
        (NORMALIZED_MAX - NORMALIZED_MIN)) /
        (dataMax - dataMin) +
      NORMALIZED_MIN, // min-max normalization
    content: item.content
  }));
};

const calculateTiles = (
  data: Input<TileData>[],
  container: { x0: number; y0: number; x1: number; y1: number },
  minTileDimensions?: {
    width: number;
    height: number;
  }
) => {
  let tiles: ILayoutRect<TileData>[] = [];
  let areTilesValid = false;
  const MAX_ITERATIONS = 100;
  let iterations = 0;

  while (!areTilesValid && iterations < MAX_ITERATIONS) {
    tiles = squarify(data, container);

    areTilesValid =
      !minTileDimensions ||
      (minTileDimensions &&
        tiles.every(
          (tile) =>
            tile.x1 - tile.x0 >= minTileDimensions.width &&
            tile.y1 - tile.y0 >= minTileDimensions.height
        ));

    container = {
      ...container,
      x1: Math.trunc(container.x1 * 1.1)
    };

    iterations++;
  }

  return { tiles, container };
};

export const TreeMap = ({
  padding = 0,
  data,
  width,
  height,
  minTileDimensions,
  normalize
}: TreeMapProps) => {
  const container = { x0: 0, y0: 0, x1: width ?? 0, y1: height ?? 0 };
  const normalizedData = normalize ? normalizeData(data) : data;
  const sortedData = [...normalizedData].sort((a, b) => b.value - a.value);
  const tilesData = calculateTiles(sortedData, container, minTileDimensions);

  // Transform coordinates to add paddings between tiles
  const transformedTiles = padding
    ? tilesData.tiles.map((tile) => {
        const isLeftEdge = tile.x0 === 0;
        const isTopEdge = tile.y0 === 0;
        const isRightEdge = tile.x1 - tilesData.container.x1 < 1;
        const isBottomEdge = tile.y1 - tilesData.container.y1 < 1;

        return {
          ...tile,
          x0: isLeftEdge ? tile.x0 : tile.x0 + padding,
          y0: isTopEdge ? tile.y0 : tile.y0 + padding,
          x1: isRightEdge ? tile.x1 : tile.x1 - padding,
          y1: isBottomEdge ? tile.y1 : tile.y1 - padding
        };
      })
    : tilesData.tiles;

  return (
    <div
      style={{
        position: "relative",
        width: container.x1,
        height: container.y1
      }}
    >
      {[width, height].some(isNull)
        ? null
        : transformedTiles.map((tile) => {
            return (
              <div
                key={tile.id}
                className={"treemap-tile-container"}
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
