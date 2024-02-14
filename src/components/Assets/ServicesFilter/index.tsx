import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isEnvironment } from "../../../typeGuards/isEnvironment";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { ConfigContext } from "../../common/App/ConfigContext";
import { FilterMenu } from "../../common/FilterMenu";
import { NewPopover } from "../../common/NewPopover";
import { actions } from "../actions";
import { ServiceData } from "../types";
import { FilterButton } from "./FilterButton";
import { ServicesFilterProps } from "./types";

const REFRESH_INTERVAL = isNumber(window.assetsRefreshInterval)
  ? window.assetsRefreshInterval
  : 10 * 1000; // in milliseconds

const preselectedServices =
  Array.isArray(window.assetsSelectedServices) &&
  window.assetsSelectedServices.every(isString)
    ? window.assetsSelectedServices
    : [];

export const ServicesFilter = (props: ServicesFilterProps) => {
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [areServicesLoading, setAreServicesLoading] = useState(false);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const [services, setServices] = useState<string[]>();
  const previousSelectedServices = usePrevious(props.selectedServices);
  const config = useContext(ConfigContext);
  const previousEnvironment = usePrevious(config.environment);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_SERVICES
    });
    setAreServicesLoading(true);
  }, []);

  useEffect(() => {
    const handleServicesData = (data: unknown, timeStamp: number) => {
      const serviceData = data as ServiceData;
      setLastSetDataTimeStamp(timeStamp);
      const oldSelectedServices = Array.isArray(props.selectedServices)
        ? props.selectedServices
        : preselectedServices;

      const newSelectedServices = serviceData.services.filter((x) =>
        oldSelectedServices.includes(x)
      );

      props.onChange(newSelectedServices);
      setServices(serviceData.services);
      setAreServicesLoading(false);
    };

    dispatcher.addActionListener(actions.SET_SERVICES, handleServicesData);

    return () => {
      dispatcher.removeActionListener(actions.SET_SERVICES, handleServicesData);
    };
  }, [props.selectedServices, props.onChange]);

  useEffect(() => {
    if (
      isEnvironment(previousEnvironment) &&
      previousEnvironment.originalName !== config.environment?.originalName
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
      previousSelectedServices !== props.selectedServices
    ) {
      window.sendMessageToDigma({
        action: actions.SET_SELECTED_SERVICES,
        payload: {
          services: props.selectedServices
        }
      });
    }
  }, [previousSelectedServices, props.selectedServices]);

  const handleServiceMenuClose = () => {
    setIsServiceMenuOpen(false);
  };

  const handleServiceMenuItemClick = (service: string) => {
    const oldSelectedServices = props.selectedServices || [];
    const serviceIndex = oldSelectedServices.findIndex((x) => x === service);

    if (serviceIndex < 0) {
      props.onChange([...oldSelectedServices, service]);
    } else {
      props.onChange([
        ...oldSelectedServices.slice(0, serviceIndex),
        ...oldSelectedServices.slice(serviceIndex + 1)
      ]);
    }
  };

  const filterMenuItems = (services || []).map((x) => ({
    label: x,
    value: x,
    selected: (props.selectedServices || []).includes(x)
  }));

  return (
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
      <div>
        <FilterButton
          title={"Services"}
          selectedCount={props.selectedServices?.length}
          isMenuOpen={isServiceMenuOpen}
          isLoading={areServicesLoading}
        />
      </div>
    </NewPopover>
  );
};
