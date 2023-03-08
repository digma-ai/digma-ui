import { useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { getActions } from "../../utils/getActions";
import { groupBy } from "../../utils/groupBy";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import * as s from "./styles";
import {
  AssetsProps,
  CodeObjectAssetsResponse,
  ExtendedAssetEntry,
  GroupedAssetEntries
} from "./types";

const REFRESH_INTERVAL =
  typeof window.assetsRefreshInterval === "number"
    ? window.assetsRefreshInterval
    : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "RECENT_ACTIVITY";

const actions = getActions(ACTION_PREFIX, {
  getData: "GET_DATA",
  setData: "SET_DATA",
  goToAsset: "GO_TO_ASSET"
});

const groupEntries = (data: CodeObjectAssetsResponse): GroupedAssetEntries => {
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
      setData(groupEntries(data as CodeObjectAssetsResponse));
    };

    dispatcher.addActionListener(actions.setData, handleAssetsData);

    return () => {
      clearInterval(refreshInterval);

      dispatcher.removeActionListener(actions.setData, handleAssetsData);
    };
  }, []);

  useEffect(() => {
    const assetEntries: ExtendedAssetEntry[] = props.data.serviceAssetsEntries
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

    setData(groupedAssetEntries);
  }, [props.data]);

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
  };

  const handleSelect = (assetTypeId: string) => {
    setSelectedAssetTypeId(assetTypeId);
  };

  const renderContent = useMemo((): JSX.Element => {
    if (!data) {
      return <></>;
    }

    if (!selectedAssetTypeId) {
      return <AssetTypeList data={data} onSelect={handleSelect} />;
    }

    const selectedAssetTypeEntries = data[selectedAssetTypeId] || [];

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        assetTypeId={selectedAssetTypeId}
        entries={selectedAssetTypeEntries}
      />
    );
  }, [data, selectedAssetTypeId]);

  return <s.Container>{renderContent}</s.Container>;
};
