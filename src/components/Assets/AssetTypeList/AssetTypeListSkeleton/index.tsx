import { Skeleton } from "../../../common/Skeleton";
import * as s from "./styles";

export const AssetTypeSkeleton = () => (
  <s.AssetTypeContainer>
    <Skeleton type={"rectangle"} width={20} />
    <Skeleton type={"text"} />
  </s.AssetTypeContainer>
);

export const AssetTypeListSkeleton = () => (
  <s.AssetTypeContainer>
    <AssetTypeSkeleton />
    <AssetTypeSkeleton />
    <AssetTypeSkeleton />
    <AssetTypeSkeleton />
  </s.AssetTypeContainer>
);
