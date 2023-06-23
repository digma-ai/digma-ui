import { useEffect, useMemo, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import {
  GETTING_STARTED_VIDEO_URL,
  SLACK_WORKSPACE_URL
} from "../../constants";
import { dispatcher } from "../../dispatcher";
import { isNumber } from "../../typeGuards/isNumber";
import { addPrefix } from "../../utils/addPrefix";
import { groupBy } from "../../utils/groupBy";
import { actions as globalActions } from "../common/App";
import { Button } from "../common/Button";
import { StackIcon } from "../common/icons/StackIcon";
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

const getNoDataIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#f1f5fa";
    case "dark":
    case "dark-jetbrains":
      return "#c6c6c6";
  }
};

export const Assets = (props: AssetsProps) => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );
  const [data, setData] = useState<GroupedAssetEntries>();
  const theme = useTheme();
  const noDataIconColor = getNoDataIconColor(theme);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA
    });

    let getDataTimeout: number;

    const handleAssetsData = (data: unknown) => {
      const entries = (data as AssetsData).serviceAssetsEntries;
      setData(groupEntries(entries));

      getDataTimeout = window.setTimeout(() => {
        window.sendMessageToDigma({
          action: actions.GET_DATA
        });
      }, REFRESH_INTERVAL);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleAssetsData);

    return () => {
      clearTimeout(getDataTimeout);

      dispatcher.removeActionListener(actions.SET_DATA, handleAssetsData);
    };
  }, []);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    const groupedAssetEntries = groupEntries(props.data.serviceAssetsEntries);
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
      action: actions.GO_TO_ASSET,
      payload: { entry }
    });
  };

  const handleSlackLinkClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url: SLACK_WORKSPACE_URL
      }
    });
  };

  const handleGettingStartedButtonClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url: GETTING_STARTED_VIDEO_URL
      }
    });
  };

  const renderContent = useMemo((): JSX.Element => {
    if (!data) {
      return (
        <s.NoDataContainer>
          <s.Circle>
            <StackIcon size={41} color={noDataIconColor} />
          </s.Circle>
          <s.NoDataTitle>No Data</s.NoDataTitle>
          <s.NoDataText>
            Please check out the &quot;Getting started&quot; video to see how to
            collect data from your application. If you still have any issues,
            please let us know on our{" "}
            <s.SlackLink onClick={handleSlackLinkClick}>Slack</s.SlackLink>{" "}
            channel.
          </s.NoDataText>
          <Button onClick={handleGettingStartedButtonClick}>
            Getting Started
          </Button>
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
  }, [data, selectedAssetTypeId, noDataIconColor]);

  return <s.Container>{renderContent}</s.Container>;
};
