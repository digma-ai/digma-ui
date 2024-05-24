import { Skeleton } from "../../../common/Skeleton";
import * as s from "./styles";

export const AssetTypeListItemSkeleton = () => (
  <s.Container>
    <Skeleton type={"rectangle"} width={20} />
    <Skeleton type={"text"} />
  </s.Container>
);
