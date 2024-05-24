import { Skeleton } from "../../common/Skeleton";
import { InsightStatsSkeleton } from "../InsightsCatalog/InsightsStats/InsightStatsSkeleton";
import { InsightCardSkeleton } from "./InsightCardSkeleton";
import * as s from "./styles";
import { InsightsCatalogSkeletonProps } from "./types";

export const InsightsCatalogSkeleton = ({
  insightViewType
}: InsightsCatalogSkeletonProps) => (
  <s.Container>
    <s.Toolbar>
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
    </s.Toolbar>
    {insightViewType === "Issues" && <InsightStatsSkeleton />}
    <s.CardsContainer>
      <InsightCardSkeleton />
      <InsightCardSkeleton />
      <InsightCardSkeleton />
    </s.CardsContainer>
  </s.Container>
);
