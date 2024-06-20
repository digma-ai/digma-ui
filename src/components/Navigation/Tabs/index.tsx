import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { InsightStats, Scope } from "../../common/App/types";
import { MagicWandIcon } from "../../common/icons/16px/MagicWandIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { BaseTabData, TAB_IDS, TabData } from "./types";

const tabs: BaseTabData[] = [
  {
    id: TAB_IDS.HIGHLIGHTS,
    icon: MagicWandIcon,
    width: 40
  },
  {
    title: "Issues",
    id: TAB_IDS.ISSUES
  },
  {
    title: "Assets",
    id: TAB_IDS.ASSETS
  },
  {
    title: "Analytics",
    id: TAB_IDS.ANALYTICS
  },
  {
    title: "Errors",
    id: TAB_IDS.ERRORS
  },
  {
    title: "Tests",
    id: TAB_IDS.TESTS
  }
];

const getTabTooltipMessage = (
  tab: BaseTabData,
  scope?: Scope
): string | undefined => {
  if (!scope?.span && [TAB_IDS.ERRORS, TAB_IDS.TESTS].includes(tab.id)) {
    return "Global errors and tests is COMING SOON";
  }

  return tab.title;
};

const getIsTabDisabled = (tab: BaseTabData, scope?: Scope): boolean => {
  if (
    !scope?.span &&
    [
      TAB_IDS.HIGHLIGHTS,
      TAB_IDS.ANALYTICS,
      TAB_IDS.ERRORS,
      TAB_IDS.TESTS
    ].includes(tab.id)
  ) {
    return true;
  }

  return false;
};

const getIsNewIndicatorVisible = (
  tab: BaseTabData,
  insightsStats: InsightStats | undefined,
  scope: Scope | undefined
): boolean =>
  Boolean(
    tab.id === TAB_IDS.ISSUES
      ? insightsStats &&
        scope?.span?.spanCodeObjectId ===
          insightsStats.scope?.span.spanCodeObjectId
        ? insightsStats && insightsStats.unreadInsightsCount > 0
        : scope &&
          isNumber(scope.unreadInsightsCount) &&
          scope.unreadInsightsCount > 0
      : false
  );

export const Tabs = () => {
  const config = useContext(ConfigContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (tab: TabData) => {
    if (!getIsTabDisabled(tab, config.scope)) {
      sendUserActionTrackingEvent(trackingEvents.TAB_CLICKED, {
        tabName: tab.id
      });

      if (!tab.isSelected) {
        navigate(tab.id);
      }
    }
  };

  const tabsData: TabData[] = useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      isSelected: location.pathname.startsWith(`/${tab.id}`),
      isDisabled: getIsTabDisabled(tab, config.scope),
      hasNewData: getIsNewIndicatorVisible(
        tab,
        config.insightStats,
        config.scope
      ),
      tooltipMessage: getTabTooltipMessage(tab, config.scope)
    }));
  }, [config.scope, config.insightStats, location.pathname]);

  return (
    <s.TabList>
      {tabsData.map((tab) => {
        const isNewIndicatorVisible = getIsNewIndicatorVisible(
          tab,
          config.insightStats,
          config.scope
        );

        return (
          <Tooltip
            title={tab.tooltipMessage ?? ""}
            key={tab.id}
            isOpen={isString(tab.tooltipMessage) ? undefined : false}
          >
            <s.Tab
              $width={tab.width}
              $isSelected={tab.isSelected}
              $isDisabled={tab.isDisabled}
              onClick={() => handleTabClick(tab)}
            >
              {tab.icon && <tab.icon color={"currentColor"} size={16} />}
              {isString(tab.title) && <s.TabTitle>{tab.title}</s.TabTitle>}
              {isNewIndicatorVisible && <s.Indicator type={"new"} />}
              {config.scope?.hasErrors && [TAB_IDS.ERRORS].includes(tab.id) && (
                <s.Indicator type={"errors"} />
              )}
            </s.Tab>
          </Tooltip>
        );
      })}
    </s.TabList>
  );
};
