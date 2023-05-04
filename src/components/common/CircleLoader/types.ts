export interface CircleLoaderProps {
  size?: number;
  colors: {
    start: string;
    end: string;
    background: string;
  };
}

export interface OuterCircleProps {
  size: number;
  startColor: string;
  endColor: string;
}

export interface InnerCircleProps {
  background: string;
}
