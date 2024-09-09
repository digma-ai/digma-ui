import { getAssetTypeInfo } from "../../../../Assets/utils";
import { DiscoveredCard } from "../DiscoveredCard";
import { OptionConfig } from "../DiscoveredCard/types";
import { DiscoveredAssetsProps } from "./types";

const ROW_SIZE = 4;

export const DiscoveredAssets = ({
  statistics = { data: [], totalCount: 0 }
}: DiscoveredAssetsProps) => {
  const items: OptionConfig[] = [
    { counter: statistics.totalCount, title: "All Assets" }
  ].concat(
    statistics.data.map((x) => ({
      counter: x.count,
      title: getAssetTypeInfo(x.name)?.label ?? x.name
    }))
  );

  return (
    <DiscoveredCard
      title={"Discovered Assets"}
      options={[items.slice(0, ROW_SIZE), items.slice(ROW_SIZE)]}
    />
  );
};
