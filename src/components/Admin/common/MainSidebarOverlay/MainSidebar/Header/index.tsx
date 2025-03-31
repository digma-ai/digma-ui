import { useEffect, useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import { getFeatureFlagValue } from "../../../../../../featureFlags";
import { usePrevious } from "../../../../../../hooks/usePrevious";
import { useGetAboutQuery } from "../../../../../../redux/services/digma";
import { FeatureFlag } from "../../../../../../types";
import { HistoryNavigationPanel } from "../../../../../common/HistoryNavigationPanel";
import { CrossIcon } from "../../../../../common/icons/16px/CrossIcon";
import { NewIconButton } from "../../../../../common/v3/NewIconButton";
import { isDisplayNameTooLong } from "../../../../../Navigation/isDisplayNameTooLong";
import { ScopeBar } from "../../../../../Navigation/ScopeBar";
import { SpanInfo } from "../../../../../Navigation/SpanInfo";
import { Tabs } from "../../../../../Navigation/Tabs";
import * as s from "./styles";
import type { HeaderProps } from "./types";

export const Header = ({
  onCloseButtonClick,
  scope,
  onGoBack,
  onGoForward,
  onGoHome,
  spanInfo,
  canGoBack,
  canGoForward,
  onTabSelect,
  selectedTabId,
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

  const handleCloseButtonClick = () => {
    onCloseButtonClick();
  };

  const handleGoBack = () => {
    onGoBack();
  };

  const handleGoForward = () => {
    onGoForward();
  };

  const handleGoHome = () => {
    onGoHome();
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
      <s.ContentContainer>
        <s.TitleRow>
          <NewIconButton
            buttonType={"secondaryBorderless"}
            icon={CrossIcon}
            onClick={handleCloseButtonClick}
          />
        </s.TitleRow>
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
      </s.ContentContainer>
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
