import { useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { getActions } from "../../utils/getActions";
import { groupBy } from "../../utils/groupBy";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import * as s from "./styles";
import {
  AssetEntry,
  AssetsData,
  AssetsProps,
  ExtendedAssetEntry,
  GroupedAssetEntries
} from "./types";

const REFRESH_INTERVAL =
  typeof window.assetsRefreshInterval === "number"
    ? window.assetsRefreshInterval
    : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "ASSETS";

const actions = getActions(ACTION_PREFIX, {
  getData: "GET_DATA",
  setData: "SET_DATA",
  goToAsset: "GO_TO_ASSET"
});

const groupEntries = (data: AssetsData): GroupedAssetEntries => {
  const assetEntries: ExtendedAssetEntry[] = data.serviceAssetsEntries
    .flat()
    .map((entry) =>
      entry.assetEntries.map((entry) => ({
        ...entry,
        id: entry.span.spanCodeObjectId
      }))
    )
    .flat();

  const assetTypes = groupBy<ExtendedAssetEntry>(assetEntries, "assetType");

  const groupedAssetEntries: {
    [key: string]: { [key: string]: ExtendedAssetEntry[] };
  } = {};

  Object.keys(assetTypes).forEach((assetType) => {
    groupedAssetEntries[assetType] = groupBy<ExtendedAssetEntry>(
      assetTypes[assetType],
      "id"
    );
  });

  return groupedAssetEntries;
};

export const Assets = (props: AssetsProps) => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );
  const [data, setData] = useState<GroupedAssetEntries>();

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.getData
    });
    const refreshInterval = setInterval(() => {
      window.sendMessageToDigma({
        action: actions.getData
      });
    }, REFRESH_INTERVAL);

    const handleAssetsData = (data: unknown) => {
      setData(groupEntries(data as AssetsData));
    };

    dispatcher.addActionListener(actions.setData, handleAssetsData);

    return () => {
      clearInterval(refreshInterval);

      dispatcher.removeActionListener(actions.setData, handleAssetsData);
    };
  }, []);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    const groupedAssetEntries = groupEntries(props.data);
    setData(groupedAssetEntries);
  }, [props.data]);

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    setSelectedAssetTypeId(assetTypeId);
  };

  const handleAssetLinkClick = (entry: AssetEntry) => {
    window.sendMessageToDigma({
      action: actions.goToAsset,
      data: { entry }
    });
  };

  const renderContent = useMemo((): JSX.Element => {
    if (!data) {
      return <></>;
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
