import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../../actions";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { EmptyState } from "../../common/EmptyState";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { CardsIcon } from "../../common/icons/CardsIcon";
import { actions } from "../actions";
import { getAssetTypeInfo } from "../utils";
import { AssetTypeListItem } from "./AssetTypeListItem";
import * as s from "./styles";
import { AssetCategoriesData, AssetTypeListProps } from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

const ASSET_TYPE_IDS = [
  "Endpoint",
  "Consumer",
  "DatabaseQueries",
  "CodeLocation",
  "EndpointClient",
  "Other"
];

export const AssetTypeList = (props: AssetTypeListProps) => {
  const [data, setData] = useState<AssetCategoriesData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_CATEGORIES_DATA
    });
    setIsInitialLoading(true);

    const handleCategoriesData = (data: unknown, timeStamp: number) => {
      setData(data as AssetCategoriesData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      actions.SET_CATEGORIES_DATA,
      handleCategoriesData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CATEGORIES_DATA,
        handleCategoriesData
      );
    };
  }, []);

  useEffect(() => {
    if (
      isString(previousEnvironment) &&
      previousEnvironment !== config.environment
    ) {
      window.sendMessageToDigma({
        action: actions.GET_CATEGORIES_DATA
      });
    }
  }, [previousEnvironment, config.environment]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      window.sendMessageToDigma({
        action: actions.GET_CATEGORIES_DATA
      });
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (!previousData && data) {
      setIsInitialLoading(false);
    }
  }, [previousData, data]);

  const handleAssetTypeClick = (assetTypeId: string) => {
    props.onAssetTypeSelect(assetTypeId);
  };

  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "assets"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  if (isInitialLoading) {
    return (
      <s.NoDataContainer>
        <EmptyState content={<NewCircleLoader size={32} />} />
      </s.NoDataContainer>
    );
  }

  if (data?.assetCategories.every((x) => x.count === 0)) {
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

  return (
    <s.List>
      {ASSET_TYPE_IDS.map((assetTypeId) => {
        const assetTypeData = data?.assetCategories.find(
          (x) => x.name === assetTypeId
        );
        const assetTypeInfo = getAssetTypeInfo(assetTypeId);
        const entryCount = assetTypeData?.count || 0;

        return (
          <AssetTypeListItem
            id={assetTypeId}
            key={assetTypeId}
            icon={assetTypeInfo?.icon}
            entryCount={entryCount}
            label={assetTypeInfo?.label}
            onAssetTypeClick={handleAssetTypeClick}
          />
        );
      })}
    </s.List>
  );
};
