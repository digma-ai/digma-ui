import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { useHistory } from "../../Main/useHistory";
import type { InsightStats, Scope } from "../../common/App/types";
import { MagicWandIcon } from "../../common/icons/16px/MagicWandIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { BaseTabData, TabData } from "./types";
import { TAB_IDS } from "./types";

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
  scope: Scope | null
): string | undefined => {
  if (!scope?.span && tab.id === TAB_IDS.TESTS) {
    return "Global tests is COMING SOON";
  }

  return tab.title;
};

const getIsTabDisabled = (tab: BaseTabData, scope: Scope | null): boolean => {
  if (!scope?.span && [TAB_IDS.HIGHLIGHTS].includes(tab.id)) {
    return true;
  }

  return false;
};

const getIsNewIndicatorVisible = (
  tab: BaseTabData,
  insightsStats: InsightStats | null,
  scope: Scope | null
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
  const { scope, insightStats } = useConfigSelector();
  const location = useLocation();
  const { goTo } = useHistory();

  const handleTabClick = (tab: TabData) => {
    if (!getIsTabDisabled(tab, scope)) {
      sendUserActionTrackingEvent(trackingEvents.TAB_CLICKED, {
        tabName: tab.id
      });

      if (!tab.isSelected) {
        goTo(`/${tab.id}`);
      }
    }
  };

  const tabsData: TabData[] = useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      isSelected: location.pathname.startsWith(`/${tab.id}`),
      isDisabled: getIsTabDisabled(tab, scope),
      hasNewData: getIsNewIndicatorVisible(tab, insightStats, scope),
      tooltipMessage: getTabTooltipMessage(tab, scope)
    }));
  }, [scope, insightStats, location.pathname]);

  return (
    <s.TabList>
      {tabsData.map((tab) => {
        const isNewIndicatorVisible = getIsNewIndicatorVisible(
          tab,
          insightStats,
          scope
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
              {scope?.hasErrors && [TAB_IDS.ERRORS].includes(tab.id) && (
                <s.Indicator type={"errors"} />
              )}
            </s.Tab>
          </Tooltip>
        );
      })}
    </s.TabList>
  );
};
