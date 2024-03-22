import { useContext } from "react";
import { getFeatureFlagValue } from "../../../featureFlags";
import { isNumber } from "../../../typeGuards/isNumber";
import { FeatureFlag } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
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
  if (
    !scope?.span &&
    ["analytics", "errors", "errorsDetails", "tests"].includes(tab.id)
  ) {
    return true;
  }

  return tab.isDisabled;
};

export const Tabs = (props: TabsProps) => {
  const config = useContext(ConfigContext);

  const handleTabClick = (tab: TabData) => {
    if (!getIsTabDisabled(tab, config.scope)) {
      sendTrackingEvent(trackingEvents.TAB_CLICKED, {
        tabName: tab.id
      });
      props.onSelect(tab.id);
    }
  };

  const tabs = props.tabs.filter(
    (x) =>
      !x.isHidden ||
      (!x.isHidden &&
        x.id === "analytics" &&
        getFeatureFlagValue(config, FeatureFlag.IS_ANALYTICS_TAB_VISIBLE))
  );

  return (
    <s.TabList>
      {tabs.map((tab) => {
        const tooltipMessage = getTabTooltipMessage(tab, config.scope);
        const isDisabled = getIsTabDisabled(tab, config.scope);
        const isNewIndicatorVisible =
          tab.hasNewData ||
          (tab.id === "insights" &&
          config.insightStats &&
          config.scope?.span?.spanCodeObjectId ===
            config.insightStats.scope?.span.spanCodeObjectId
            ? config.insightStats && config.insightStats.unreadInsightsCount > 0
            : config.scope &&
              isNumber(config.scope.unreadInsightsCount) &&
              config.scope.unreadInsightsCount > 0);

        return (
          <Tooltip
            title={tooltipMessage}
            key={tab.id}
            isOpen={tooltipMessage ? undefined : false}
          >
            <s.Tab
              $isSelected={tab.isSelected}
              $isDisabled={isDisabled}
              onClick={() => handleTabClick(tab)}
            >
              {tab.title}
              {isNewIndicatorVisible && <s.Indicator type={"new"} />}
              {config.scope?.hasErrors &&
                ["errorsDetails", "errors"].includes(tab.id) && (
                  <s.Indicator type={"errors"} />
                )}
            </s.Tab>
          </Tooltip>
        );
      })}
    </s.TabList>
  );
};
