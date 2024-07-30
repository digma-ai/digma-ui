import { DiscoveredCard } from "../DiscoveredCard";
import { OptionConfig } from "../DiscoveredCard/types";
import { DiscoveredAssetsProps } from "./types";

const titleMap: Record<string, string> = {
  ["Endpoint"]: "Endpoints",
  ["DatabaseQueries"]: "Database Queries",
  ["Consumer"]: "Consumer",
  ["EndpointClient"]: "Endpoint Client",
  ["CodeLocation"]: "Code locations",
  ["Cache"]: "Cache",
  ["otherCount"]: "Other"
};

export const DiscoveredAssets = ({
  statistics = { data: [], totalCount: 0 }
}: DiscoveredAssetsProps) => {
  const items: OptionConfig[] = [
    { counter: statistics.totalCount, title: "All Assets" }
  ].concat(
    statistics.data.map((x) => ({
      counter: x.count,
      title: titleMap[x.name] ?? x.name
    }))
  );

  return (
    <DiscoveredCard
      title="Discovered Assets"
      options={[items.slice(0, 4), items.slice(4)]}
    />
  );
};
