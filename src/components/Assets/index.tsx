import { useEffect, useMemo, useState } from "react";
import { actions as globalActions } from "../../actions";
import { dispatcher } from "../../dispatcher";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { groupBy } from "../../utils/groupBy";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { EmptyState } from "../common/EmptyState";
import { CardsIcon } from "../common/icons/CardsIcon";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import * as s from "./styles";
import {
  AssetEntry,
  AssetsData,
  AssetsProps,
  ExtendedAssetEntry,
  GroupedAssetEntries,
  ServiceAssetsEntry
} from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "ASSETS";

const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  GO_TO_ASSET: "GO_TO_ASSET"
});

const groupEntries = (data: ServiceAssetsEntry[]): GroupedAssetEntries => {
  const assetEntries: ExtendedAssetEntry[] = data
    .flat()
    .map((entry) =>
      entry.assetEntries.map((entry) => ({
        ...entry,
        id: entry.span.spanCodeObjectId
      }))
    )
    .flat();

  const assetTypes = groupBy(assetEntries, (x) => x.assetType);

  const groupedAssetEntries: {
    [key: string]: { [key: string]: ExtendedAssetEntry[] };
  } = {};

  Object.keys(assetTypes).forEach((assetType) => {
    groupedAssetEntries[assetType] = groupBy(
      assetTypes[assetType],
      (x) => x.id
    );
  });

  return groupedAssetEntries;
};

export const Assets = (props: AssetsProps) => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );
  const [data, setData] = useState<GroupedAssetEntries>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA
    });

    const handleAssetsData = (data: unknown, timeStamp: number) => {
      const entries = (data as AssetsData | null)?.serviceAssetsEntries;
      setData(entries ? groupEntries(entries) : undefined);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleAssetsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleAssetsData);
    };
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      window.sendMessageToDigma({
        action: actions.GET_DATA
      });
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp]);

  useEffect(() => {
    if (props.data) {
      const groupedAssetEntries = groupEntries(props.data.serviceAssetsEntries);
      setData(groupedAssetEntries);
    }
  }, [props.data]);

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    setSelectedAssetTypeId(assetTypeId);
  };

  const handleAssetLinkClick = (entry: AssetEntry) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_ASSET,
      payload: { entry }
    });
  };

  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "assets"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const renderContent = useMemo((): JSX.Element => {
    if (!data || Object.keys(data).length === 0) {
      return (
        <s.NoDataContainer>
          <EmptyState
            icon={CardsIcon}
            title={"No data yet"}
            content={
              <>
                <s.EmptyStateDescription>
                  Trigger actions that call this application to learn more about
                  its runtime behavior
                </s.EmptyStateDescription>
                <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
                  Not seeing your application data?
                </s.TroubleshootingLink>
              </>
            }
          />
        </s.NoDataContainer>
      );
    }

    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList data={data} onAssetTypeSelect={handleAssetTypeSelect} />
      );
    }

    const selectedAssetTypeEntries = data[selectedAssetTypeId] || [];

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        onAssetLinkClick={handleAssetLinkClick}
        assetTypeId={selectedAssetTypeId}
        entries={selectedAssetTypeEntries}
      />
    );
  }, [data, selectedAssetTypeId]);

  return <s.Container>{renderContent}</s.Container>;
};
