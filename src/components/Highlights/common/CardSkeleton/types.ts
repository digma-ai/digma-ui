export interface CardSkeletonProps {
  type?: "default" | "asset" | "spanInfo";
}

export interface CellSkeletonProps {
  withIcon?: boolean;
}

export type ColumnSkeletonProps = CellSkeletonProps;
