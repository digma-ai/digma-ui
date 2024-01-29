import { useContext, useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { ConfigContext } from "../../common/App/ConfigContext";
import { NewPopover } from "../../common/NewPopover";
import { ChevronIcon } from "../../common/icons/ChevronIcon";
import { FilterIcon } from "../../common/icons/FilterIcon";
import { Direction } from "../../common/icons/types";
import { FilterMenu } from "../FilterMenu";
import { actions } from "../actions";
import { ServiceData } from "../types";
import * as s from "./styles";
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

    const handleServicesData = (data: unknown, timeStamp: number) => {
      const serviceData = data as ServiceData;
      setLastSetDataTimeStamp(timeStamp);
      if (services === undefined) {
        const oldSelectedServices = Array.isArray(props.selectedServices)
          ? props.selectedServices
          : preselectedServices;

        const newSelectedServices = serviceData.services.filter((x) =>
          oldSelectedServices.includes(x)
        );

        props.onChange(newSelectedServices);
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
      width={"max-content"}
      onOpenChange={setIsServiceMenuOpen}
      isOpen={isServiceMenuOpen}
      placement={"bottom-end"}
    >
      <s.ServiceMenuButton>
        <s.ServiceMenuButtonLabel>
          <FilterIcon color={"currentColor"} size={14} />
          <span>Services</span>
          {props.selectedServices &&
          props.selectedServices.length > 0 &&
          !areServicesLoading ? (
            <s.Number>{props.selectedServices.length}</s.Number>
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
  );
};
