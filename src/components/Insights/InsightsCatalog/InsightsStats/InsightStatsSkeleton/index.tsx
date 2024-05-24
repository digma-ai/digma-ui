import { Skeleton } from "../../../../common/Skeleton";
import { Stats } from "../styles";
import * as s from "./styles";

const StatSkeleton = () => (
  <s.StatSkeleton>
    <Skeleton type={"circle"} height={18} />
    <Skeleton type={"text"} />
  </s.StatSkeleton>
);

export const InsightStatsSkeleton = () => (
  <Stats>
    <StatSkeleton />
    <StatSkeleton />
    <StatSkeleton />
  </Stats>
);
