import type { ReactNode } from "react";
import type { Input } from "squarify";

export interface TileData {
  id: string;
  content: ReactNode;
}

export interface TreeMapProps {
  padding?: number;
  data: Input<TileData>[];
  width: number | null;
  height: number | null;
  minTileDimensions?: {
    width: number;
    height: number;
  };
}
