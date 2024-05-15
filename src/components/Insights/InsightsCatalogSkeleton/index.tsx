import { Skeleton } from "../../common/Skeleton";
import { InsightCardSkeleton } from "./InsightCardSkeleton";
import * as s from "./styles";

export const InsightsCatalogSkeleton = () => (
  <s.Container>
    <s.Toolbar>
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
      <Skeleton type={"rectangle"} />
    </s.Toolbar>
    <s.CardsContainer>
      <InsightCardSkeleton />
      <InsightCardSkeleton />
      <InsightCardSkeleton />
    </s.CardsContainer>
  </s.Container>
);
