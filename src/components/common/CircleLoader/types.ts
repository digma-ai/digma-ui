export interface CircleLoaderColors {
  start: string;
  end: string;
  background: string;
}

export interface CircleLoaderProps {
  size?: number;
  colors?: CircleLoaderColors;
}

export interface OuterCircleProps {
  size: number;
  startColor: string;
  endColor: string;
}

export interface InnerCircleProps {
  background: string;
}
