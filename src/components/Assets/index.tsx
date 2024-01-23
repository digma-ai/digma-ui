import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import { dispatcher } from "../../dispatcher";
import { getFeatureFlagValue } from "../../featureFlags";
import { usePrevious } from "../../hooks/usePrevious";
import { isNumber } from "../../typeGuards/isNumber";
import { isString } from "../../typeGuards/isString";
import { FeatureFlag } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import { NewPopover } from "../common/NewPopover";
import { ChevronIcon } from "../common/icons/ChevronIcon";
import { FilterIcon } from "../common/icons/FilterIcon";
import { Direction } from "../common/icons/types";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { FilterMenu } from "./FilterMenu";
import { FiltersMenu } from "./FiltersMenu";
import { actions } from "./actions";
import * as s from "./styles";
import { ServiceData } from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

const preselectedServices =
  Array.isArray(window.assetsSelectedServices) &&
  window.assetsSelectedServices.every(isString)
    ? window.assetsSelectedServices
    : [];

export const Assets = () => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );
  const [services, setServices] = useState<string[]>();
  const [areServicesLoading, setAreServicesLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [selectedServices, setSelectedServices] = useState<string[]>();
  const previousSelectedServices = usePrevious(selectedServices);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);

  const isServiceFilterVisible = getFeatureFlagValue(
    config,
    FeatureFlag.IS_ASSETS_SERVICE_FILTER_VISIBLE
  );

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
    window.sendMessageToDigma({
      action: actions.GET_SERVICES
    });
    setAreServicesLoading(true);

    const handleServicesData = (data: unknown, timeStamp: number) => {
      const serviceData = data as ServiceData;
      setLastSetDataTimeStamp(timeStamp);
      if (services === undefined) {
        setSelectedServices((selectedServices) => {
          const oldSelectedServices = Array.isArray(selectedServices)
            ? selectedServices
            : preselectedServices;

          const newSelectedServices = serviceData.services.filter((x) =>
            oldSelectedServices.includes(x)
          );
          return newSelectedServices;
        });
      }
      setServices(serviceData.services);
      setAreServicesLoading(false);
    };

    dispatcher.addActionListener(actions.SET_SERVICES, handleServicesData);

    return () => {
      dispatcher.removeActionListener(actions.SET_SERVICES, handleServicesData);
    };
  }, []);

  useEffect(() => {
    if (
      isString(previousEnvironment) &&
      previousEnvironment !== config.environment
    ) {
      setServices(undefined);
      window.sendMessageToDigma({
        action: actions.GET_SERVICES
      });
      setAreServicesLoading(true);
    }
  }, [previousEnvironment, config.environment, services]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      window.sendMessageToDigma({
        action: actions.GET_SERVICES
      });
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp]);

  useEffect(() => {
    if (
      previousSelectedServices &&
      previousSelectedServices !== selectedServices
    ) {
      window.sendMessageToDigma({
        action: actions.SET_SELECTED_SERVICES,
        payload: {
          services: selectedServices
        }
      });
    }
  }, [previousSelectedServices, selectedServices]);

  const handleServiceMenuClose = () => {
    setIsServiceMenuOpen(false);
  };

  const handleServiceMenuItemClick = (service: string) => {
    const oldSelectedServices = selectedServices || [];
    const serviceIndex = oldSelectedServices.findIndex((x) => x === service);

    if (serviceIndex < 0) {
      setSelectedServices([...oldSelectedServices, service]);
    } else {
      setSelectedServices([
        ...oldSelectedServices.slice(0, serviceIndex),
        ...oldSelectedServices.slice(serviceIndex + 1)
      ]);
    }
  };

  const filterMenuItems = (services || []).map((x) => ({
    label: x,
    value: x,
    selected: (selectedServices || []).includes(x)
  }));

  const handleBackButtonClick = () => {
    setSelectedAssetTypeId(null);
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    setSelectedAssetTypeId(assetTypeId);
  };

  const renderContent = useMemo((): JSX.Element => {
    if (!selectedAssetTypeId) {
      return (
        <AssetTypeList
          onAssetTypeSelect={handleAssetTypeSelect}
          services={selectedServices || []}
        />
      );
    }

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        assetTypeId={selectedAssetTypeId}
        services={selectedServices || []}
      />
    );
  }, [selectedAssetTypeId, selectedServices]);

  return (
    <s.Container>
      <s.Header>
        Assets
        <FiltersMenu />
        {isServiceFilterVisible && (
          <NewPopover
            content={
              <FilterMenu
                title={"Filter by services"}
                items={filterMenuItems}
                onItemClick={handleServiceMenuItemClick}
                onClose={handleServiceMenuClose}
                isLoading={areServicesLoading}
              />
            }
            onOpenChange={setIsServiceMenuOpen}
            isOpen={isServiceMenuOpen}
            placement={"bottom-end"}
          >
            <s.ServiceMenuButton>
              <s.ServiceMenuButtonLabel>
                <FilterIcon color={"currentColor"} size={14} />
                <span>Services</span>
                {selectedServices &&
                selectedServices.length > 0 &&
                !areServicesLoading ? (
                  <s.Number>{selectedServices.length}</s.Number>
                ) : (
                  <s.SelectedServiceNumberPlaceholder>
                    All
                  </s.SelectedServiceNumberPlaceholder>
                )}
              </s.ServiceMenuButtonLabel>
              <s.ServiceMenuChevronIconContainer>
                <ChevronIcon
                  color={"currentColor"}
                  size={14}
                  direction={isServiceMenuOpen ? Direction.UP : Direction.DOWN}
                />
              </s.ServiceMenuChevronIconContainer>
            </s.ServiceMenuButton>
          </NewPopover>
        )}
      </s.Header>
      {renderContent}
    </s.Container>
  );
};
