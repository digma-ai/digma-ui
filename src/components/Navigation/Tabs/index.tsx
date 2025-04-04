import { useMemo } from "react";
import { platform } from "../../../platform";
import type { ExtendedGetInsightsStatsResponse } from "../../../redux/services/types";
import { isNumber } from "../../../typeGuards/isNumber";
import { isString } from "../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { useInsightsStats } from "../../Insights/hooks/useInsightsStats";
import { MagicWandIcon } from "../../common/icons/16px/MagicWandIcon";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { BaseTabData, TabData, TabsProps } from "./types";
import { TAB_IDS } from "./types";

const tabs: BaseTabData[] = [
  {
    id: TAB_IDS.HIGHLIGHTS,
    icon: MagicWandIcon,
    width: 40,
    platforms: ["JetBrains"]
  },
  {
    title: "Issues",
    id: TAB_IDS.ISSUES,
    platforms: ["JetBrains", "Visual Studio", "Web"]
  },
  {
    title: "Assets",
    id: TAB_IDS.ASSETS,
    platforms: ["JetBrains", "Visual Studio", "Web"]
  },
  {
    title: "Analytics",
    id: TAB_IDS.ANALYTICS,
    platforms: ["JetBrains"]
  },
  {
    title: "Errors",
    id: TAB_IDS.ERRORS,
    platforms: ["JetBrains"]
  },
  {
    title: "Tests",
    id: TAB_IDS.TESTS,
    platforms: ["JetBrains"]
  }
];

const getTabTooltipMessage = (
  tab: BaseTabData,
  spanCodeObjectId: string | undefined
): string | undefined => {
  if (!spanCodeObjectId && tab.id === TAB_IDS.TESTS) {
    return "Global tests is COMING SOON";
  }

  return tab.title;
};

const getIsTabDisabled = (
  tab: BaseTabData,
  spanCodeObjectId: string | undefined
): boolean => {
  if (!spanCodeObjectId && [TAB_IDS.HIGHLIGHTS].includes(tab.id)) {
    return true;
  }

  return false;
};

const getIsNewIndicatorVisible = (
  tab: BaseTabData,
  insightsStats: ExtendedGetInsightsStatsResponse | undefined,
  spanScopeCodeObjectId: string | undefined,
  unreadInsightsCount: number | undefined
): boolean =>
  Boolean(
    tab.id === TAB_IDS.ISSUES
      ? insightsStats &&
        spanScopeCodeObjectId === insightsStats.extra.spanCodeObjectId
        ? insightsStats.data.unreadInsightsCount > 0
        : isNumber(unreadInsightsCount) && unreadInsightsCount > 0
      : false
  );

export const Tabs = ({
  onTabSelect,
  selectedTabId,
  spanCodeObjectId,
  environmentId,
  unreadInsightsCount,
  hasErrors,
  services
}: TabsProps) => {
  const { data: insightStats } = useInsightsStats({
    spanCodeObjectId,
    environmentId,
    services
  });

  const handleTabClick = (tab: TabData) => () => {
    if (!getIsTabDisabled(tab, spanCodeObjectId)) {
      sendUserActionTrackingEvent(trackingEvents.TAB_CLICKED, {
        tabName: tab.id
      });

      if (!tab.isSelected) {
        onTabSelect(tab.id);
      }
    }
  };

  const tabsData: TabData[] = useMemo(
    () =>
      tabs
        .filter((x) => platform && x.platforms.includes(platform))
        .map((tab) => ({
          ...tab,
          isSelected: selectedTabId === tab.id,
          isDisabled: getIsTabDisabled(tab, spanCodeObjectId),
          hasNewData: getIsNewIndicatorVisible(
            tab,
            insightStats,
            spanCodeObjectId,
            unreadInsightsCount
          ),
          tooltipMessage: getTabTooltipMessage(tab, spanCodeObjectId)
        })),
    [spanCodeObjectId, unreadInsightsCount, insightStats, selectedTabId]
  );

  return (
    <s.TabList>
      {tabsData.map((tab) => (
        <Tooltip
          title={tab.tooltipMessage ?? ""}
          key={tab.id}
          isOpen={isString(tab.tooltipMessage) ? undefined : false}
        >
          <s.Tab
            $width={tab.width}
            $isSelected={tab.isSelected}
            $isDisabled={tab.isDisabled}
            onClick={handleTabClick(tab)}
          >
            {tab.icon && <tab.icon color={"currentColor"} size={16} />}
            {isString(tab.title) && <s.TabTitle>{tab.title}</s.TabTitle>}
            {tab.hasNewData && <s.Indicator type={"new"} />}
            {hasErrors && [TAB_IDS.ERRORS].includes(tab.id) && (
              <s.Indicator type={"errors"} />
            )}
          </s.Tab>
        </Tooltip>
      ))}
    </s.TabList>
  );
};
