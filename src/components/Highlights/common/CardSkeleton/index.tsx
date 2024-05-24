import { Skeleton } from "../../../common/Skeleton";
import { Card } from "../../../common/v3/Card";
import * as s from "./styles";
import {
  CardSkeletonProps,
  CellSkeletonProps,
  ColumnSkeletonProps
} from "./types";

const CellSkeleton = ({ withIcon }: CellSkeletonProps) => {
  return (
    <s.TableCellContainer>
      {withIcon && (
        <s.IconSkeletonContainer>
          <Skeleton type={"rectangle"} width={16} height={16} />
        </s.IconSkeletonContainer>
      )}
      <Skeleton type={"text"} width={45} />
    </s.TableCellContainer>
  );
};

const ColumnSkeleton = ({ withIcon }: ColumnSkeletonProps) => (
  <s.TableColumnContainer>
    <Skeleton type={"text"} />
    <CellSkeleton withIcon={withIcon} />
    <CellSkeleton withIcon={withIcon} />
    <CellSkeleton withIcon={withIcon} />
  </s.TableColumnContainer>
);

export const CardSkeleton = ({ type }: CardSkeletonProps) => (
  <Card
    header={<Skeleton type={"text"} width={96} />}
    content={
      <s.ContentContainer>
        {type === "asset" && (
          <s.AssetContainer>
            <Skeleton type={"text"} width={45} />
            <Skeleton type={"text"} />
          </s.AssetContainer>
        )}
        <s.TableContainer>
          <ColumnSkeleton withIcon={true} />
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </s.TableContainer>
      </s.ContentContainer>
    }
  />
);
