import { useContext, useEffect, useRef, useState } from "react";
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
import { AssetFilterQuery } from "../AssetsFilter/types";
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

const getData = (filters: AssetFilterQuery | undefined, services: string[]) => {
  window.sendMessageToDigma({
    action: actions.GET_CATEGORIES_DATA,
    payload: {
      query: {
        ...(filters || { services })
      }
    }
  });
};

export const AssetTypeList = (props: AssetTypeListProps) => {
  const [data, setData] = useState<AssetCategoriesData>();
  const previousData = usePrevious(data);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);
  const refreshTimerId = useRef<number>();
  const previousServices = usePrevious(props.services);
  const previousFilters = usePrevious(props.filters);

  useEffect(() => {
    getData(props.filters, props.services);
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
      window.clearTimeout(refreshTimerId.current);
    };
  }, []);

  useEffect(() => {
    if (
      (isString(previousEnvironment) &&
        previousEnvironment !== config.environment) ||
      (Array.isArray(previousServices) &&
        previousServices !== props.services) ||
      (previousFilters && previousFilters !== props.filters)
    ) {
      getData(props.filters, props.services);
    }
  }, [
    previousEnvironment,
    config.environment,
    previousServices,
    props.services,
    previousFilters,
    props.filters
  ]);

  useEffect(() => {
    if (previousLastSetDataTimeStamp !== lastSetDataTimeStamp) {
      window.clearTimeout(refreshTimerId.current);
      refreshTimerId.current = window.setTimeout(() => {
        getData(props.filters, props.services);
      }, REFRESH_INTERVAL);
    }
  }, [
    props.services,
    previousLastSetDataTimeStamp,
    lastSetDataTimeStamp,
    props.filters
  ]);

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
