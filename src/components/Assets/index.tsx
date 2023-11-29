import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "react";
import { gte, valid } from "semver";
import { dispatcher } from "../../dispatcher";
import { isNumber } from "../../typeGuards/isNumber";
import { ConfigContext } from "../common/App/ConfigContext";
import { NewPopover } from "../common/NewPopover";
import { ChevronIcon } from "../common/icons/ChevronIcon";
import { FilterIcon } from "../common/icons/FilterIcon";
import { Direction } from "../common/icons/types";
import { AssetList } from "./AssetList";
import { AssetTypeList } from "./AssetTypeList";
import { FilterMenu } from "./FilterMenu";
import { actions } from "./actions";
import * as s from "./styles";
import { AssetsProps, ServiceData } from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

export const Assets = (props: AssetsProps) => {
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string | null>(
    null
  );
  const [services, setServices] = useState<string[]>([]);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const config = useContext(ConfigContext);

  const backendVersion = config.backendInfo?.applicationVersion;

  const isServiceFilterVisible =
    backendVersion &&
    (backendVersion === "unknown" ||
      (valid(backendVersion) && gte(backendVersion, "v0.2.174")));

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
    window.sendMessageToDigma({
      action: actions.GET_SERVICES
    });

    const handleServicesData = (data: unknown, timeStamp: number) => {
      setServices((data as ServiceData).services);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_SERVICES, handleServicesData);

    return () => {
      dispatcher.removeActionListener(actions.SET_SERVICES, handleServicesData);
    };
  }, []);

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
    if (props.services) {
      setServices(props.services);
    }
  }, [props.services]);

  const handleServiceMenuClose = () => {
    setIsServiceMenuOpen(false);
  };

  const handleServiceMenuItemClick = (service: string) => {
    const serviceIndex = selectedServices.findIndex((x) => x === service);

    if (serviceIndex < 0) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices([
        ...selectedServices.slice(0, serviceIndex),
        ...selectedServices.slice(serviceIndex + 1)
      ]);
    }
  };

  const filterMenuItems = services.map((x) => ({
    label: x,
    value: x,
    selected: selectedServices.includes(x)
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
          services={selectedServices}
        />
      );
    }

    return (
      <AssetList
        onBackButtonClick={handleBackButtonClick}
        assetTypeId={selectedAssetTypeId}
        services={selectedServices}
      />
    );
  }, [selectedAssetTypeId, selectedServices]);

  return (
    <s.Container>
      <s.Header>
        Assets
        {isServiceFilterVisible && (
          <NewPopover
            content={
              <FilterMenu
                title={"Filter by services"}
                items={filterMenuItems}
                onItemClick={handleServiceMenuItemClick}
                onClose={handleServiceMenuClose}
              />
            }
            onOpenChange={setIsServiceMenuOpen}
            isOpen={isServiceMenuOpen}
            placement={"bottom-start"}
          >
            <s.ServiceMenuButton>
              <s.ServiceMenuButtonLabel>
                <FilterIcon color={"currentColor"} size={14} />
                <span>Services</span>
                {selectedServices.length > 0 ? (
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
