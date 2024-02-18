import { Fragment, useContext } from "react";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { Tooltip } from "../../common/Tooltip";
import { TabData } from "../types";
import * as s from "./styles";
import { TabsProps } from "./types";

// TODO: remove after implementing this logic on the plugin's side
const getTabTooltipMessage = (tab: TabData, scope?: Scope) => {
  if (!scope?.span && ["errors", "errorsDetails", "tests"].includes(tab.id)) {
    return "Global errors and tests is COMING SOON";
  }

  return tab.tooltipMessage;
};

// TODO: remove after implementing this logic on the plugin's side
const getIsTabDisabled = (tab: TabData, scope?: Scope) => {
  if (!scope?.span && ["errors", "errorsDetails", "tests"].includes(tab.id)) {
    return true;
  }

  return tab.isDisabled;
};

export const Tabs = (props: TabsProps) => {
  const config = useContext(ConfigContext);

  const handleTabClick = (tab: TabData) => {
    if (!tab.isDisabled) {
      props.onSelect(tab.id);
    }
  };

  return (
    <s.TabList>
      {props.tabs
        .filter((x) => !x.isHidden)
        .map((tab) => {
          const tooltipMessage = getTabTooltipMessage(tab, config.scope);
          const isDisabled = getIsTabDisabled(tab, config.scope);

          return (
            <Fragment key={tab.id}>
              {tooltipMessage ? (
                <Tooltip title={tooltipMessage}>
                  <s.Tab
                    $isSelected={tab.isSelected}
                    $isDisabled={isDisabled}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab.title}
                    {tab.hasNewData && <s.Indicator />}
                  </s.Tab>
                </Tooltip>
              ) : (
                <s.Tab
                  $isSelected={tab.isSelected}
                  $isDisabled={isDisabled}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.title}
                  {tab.hasNewData && <s.Indicator />}
                </s.Tab>
              )}
            </Fragment>
          );
        })}
    </s.TabList>
  );
};
