import { useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { getFeatureFlagValue } from "../../../../../../featureFlags";
import { usePrevious } from "../../../../../../hooks/usePrevious";
import { useGetAboutQuery } from "../../../../../../redux/services/digma";
import { FeatureFlag, ScopeChangeEvent } from "../../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { HistoryNavigationPanel } from "../../../../../common/HistoryNavigationPanel";
import { isDisplayNameTooLong } from "../../../../../Navigation/isDisplayNameTooLong";
import { ScopeBar } from "../../../../../Navigation/ScopeBar";
import { SpanInfo } from "../../../../../Navigation/SpanInfo";
import { Tabs } from "../../../../../Navigation/Tabs";
import { trackingEvents } from "../../../../tracking";
import * as s from "./styles";
import type { HeaderProps } from "./types";

export const Header = ({
  scope,
  onGoBack,
  onGoForward,
  spanInfo,
  canGoBack,
  canGoForward,
  onTabSelect,
  selectedTabId,
  onScopeChange,
  query
}: HeaderProps) => {
  const [isSpanInfoVisible, setIsSpanInfoVisible] = useState(false);
  const previousSpanInfo = usePrevious(spanInfo);
  const { observe, width: containerWidth } = useDimensions();
  const { data: about } = useGetAboutQuery();
  const isSpanInfoEnabled = Boolean(
    getFeatureFlagValue(about, FeatureFlag.IsHighlightsSpanInfoEnabled)
  );
  const linkedEndpoints = useMemo(() => [], []);
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  const isAtHome = !spanCodeObjectId;

  const handleGoBack = () => {
    sendUserActionTrackingEvent(
      trackingEvents.REPOSITORY_SIDEBAR_BACK_BUTTON_CLICKED
    );
    onGoBack();
  };

  const handleGoForward = () => {
    sendUserActionTrackingEvent(
      trackingEvents.REPOSITORY_SIDEBAR_FORWARD_BUTTON_CLICKED
    );
    onGoForward();
  };

  const handleGoHome = () => {
    sendUserActionTrackingEvent(
      trackingEvents.REPOSITORY_SIDEBAR_FORWARD_BUTTON_CLICKED
    );
    onScopeChange({
      span: null,
      context: {
        event: ScopeChangeEvent.NavigationHomeButtonClicked
      }
    });
  };

  const handleScopeDisplayNameExpandCollapseChange = (isExpanded: boolean) => {
    setIsSpanInfoVisible(isExpanded);
  };

  const handleSpanInfoCollapse = () => {
    setIsSpanInfoVisible(false);
  };

  useEffect(() => {
    if (
      previousSpanInfo?.displayName !== spanInfo?.displayName &&
      spanInfo?.displayName
    ) {
      const isSpanInfoVisible = isDisplayNameTooLong(
        spanInfo.displayName,
        containerWidth
      );
      setIsSpanInfoVisible(isSpanInfoVisible);
    }
  }, [spanInfo, previousSpanInfo, containerWidth]);

  const handleTabSelect = (tabId: string) => {
    onTabSelect(tabId);
  };

  return (
    <s.Container ref={observe}>
      <s.ToolbarRow>
        <HistoryNavigationPanel
          isAtHome={isAtHome}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoHome={handleGoHome}
        />
        <ScopeBar
          isExpanded={false}
          isSpanInfoEnabled={isSpanInfoEnabled}
          linkedEndpoints={linkedEndpoints}
          scope={scope}
          isTargetButtonMenuVisible={false}
          onExpandCollapseChange={handleScopeDisplayNameExpandCollapseChange}
        />
      </s.ToolbarRow>
      {!isAtHome && isSpanInfoEnabled && spanInfo && isSpanInfoVisible && (
        <SpanInfo
          data={spanInfo}
          onCollapse={handleSpanInfoCollapse}
          spanCodeObjectId={spanCodeObjectId}
        />
      )}
      <s.TabsContainer>
        <Tabs
          onTabSelect={handleTabSelect}
          selectedTabId={selectedTabId}
          spanCodeObjectId={spanCodeObjectId}
          environmentId={query?.environment}
          services={query?.services}
        />
      </s.TabsContainer>
    </s.Container>
  );
};
