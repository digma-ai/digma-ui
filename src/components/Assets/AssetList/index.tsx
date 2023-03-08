import { AssetEntry } from "../../common/AssetEntry";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { DIRECTION } from "../../common/icons/types";
import { getAssetTypeInfo } from "../utils";
import * as s from "./styles";
import { AssetListProps } from "./types";

export const AssetList = (props: AssetListProps) => {
  const handleBackButtonClick = () => {
    props.onBackButtonClick();
  };

  const handleAssetLinkClick = () => {
    // TODO
  };

  const assetTypeInfo = getAssetTypeInfo(props.assetTypeId);

  const uniqueEntryIds = Object.keys(props.entries);

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleBackButtonClick}>
          <ChevronIcon direction={DIRECTION.LEFT} color={"#dadada"} />
        </s.BackButton>
        {assetTypeInfo?.icon && <assetTypeInfo.icon color={"#9c9c9c"} />}
        <span>{assetTypeInfo?.label || props.assetTypeId}</span>
        <s.ItemsCount>
          {Object.values(props.entries).flat().length}
        </s.ItemsCount>
      </s.Header>
      {uniqueEntryIds.length > 0 ? (
        <s.List>
          {uniqueEntryIds.map((entryId) => {
            const entries = props.entries[entryId];
            return entries.map((entry) => {
              const services = entries.map((entry) => entry.serviceName);
              const otherServices = services.filter(
                (service) => service !== entry.serviceName
              );
              const duration = entry.durationPercentiles.find(
                (duration) => duration.percentile === 0.5
              )?.currentDuration;

              return (
                <AssetEntry
                  key={`${entryId}-${entry.serviceName}`}
                  name={entry.span.displayName}
                  services={[entry.serviceName, ...otherServices]}
                  performance={duration}
                  lastSeenDateTime={entry.lastSpanInstanceInfo.startTime}
                  insights={entry.insights}
                  onAssetLinkClick={handleAssetLinkClick}
                />
              );
            });
          })}
        </s.List>
      ) : (
        <s.NoDataText>
          Not seeing your data here? Maybe you’re missing some instrumentation!
        </s.NoDataText>
      )}
    </s.Container>
  );
};
