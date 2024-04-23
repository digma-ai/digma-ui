import { useContext } from "react";
import { isNumber } from "../../../typeGuards/isNumber";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ConfigContextData, Scope } from "../../common/App/types";
import { MagicWandIcon } from "../../common/icons/16px/MagicWandIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import { TabData } from "../types";
import * as s from "./styles";
import { TabsProps } from "./types";

const getTabTooltipMessage = (tab: TabData, scope?: Scope) => {
  if (!scope?.span && ["errors", "errorsDetails", "tests"].includes(tab.id)) {
    return "Global errors and tests is COMING SOON";
  }

  return tab.tooltipMessage;
};

const getIsTabDisabled = (tab: TabData, scope?: Scope) => {
  if (
    !scope?.span &&
    ["highlights", "analytics", "errors", "errorsDetails", "tests"].includes(
      tab.id
    )
  ) {
    return true;
  }

  return tab.isDisabled;
};

const getTabIcon = (tab: TabData) => {
  if (tab.id === "/highlights") {
    return <MagicWandIcon color={"currentColor"} size={16} />;
  }

  return null;
};

const getIsNewIndicatorVisible = (tab: TabData, config: ConfigContextData) =>
  tab.hasNewData ||
  (tab.id === "/insights"
    ? config.insightStats &&
      config.scope?.span?.spanCodeObjectId ===
        config.insightStats.scope?.span.spanCodeObjectId
      ? config.insightStats && config.insightStats.unreadInsightsCount > 0
      : config.scope &&
        isNumber(config.scope.unreadInsightsCount) &&
        config.scope.unreadInsightsCount > 0
    : false);

const getTabWidth = (tab: TabData) => {
  if (tab.id === "/highlights") {
    return 40;
  }

  return undefined;
};

export const Tabs = (props: TabsProps) => {
  const config = useContext(ConfigContext);

  const handleTabClick = (tab: TabData) => {
    if (!getIsTabDisabled(tab, config.scope)) {
      sendUserActionTrackingEvent(trackingEvents.TAB_CLICKED, {
        tabName: tab.id
      });
      props.onSelect(tab.id);
    }
  };

  const tabs = props.tabs.filter((x) => !x.isHidden);

  return (
    <s.TabList>
      {tabs.map((tab) => {
        const tooltipMessage = getTabTooltipMessage(tab, config.scope);
        const isDisabled = getIsTabDisabled(tab, config.scope);
        const isNewIndicatorVisible = getIsNewIndicatorVisible(tab, config);
        const icon = getTabIcon(tab);
        const width = getTabWidth(tab);

        return (
          <Tooltip
            title={tooltipMessage}
            key={tab.id}
            isOpen={tooltipMessage ? undefined : false}
          >
            <s.Tab
              $width={width}
              $isSelected={tab.isSelected}
              $isDisabled={isDisabled}
              onClick={() => handleTabClick(tab)}
            >
              {icon}
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
