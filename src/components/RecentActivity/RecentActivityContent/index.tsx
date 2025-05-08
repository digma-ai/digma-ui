import { useContext, useEffect, useMemo } from "react";
import { useGetRecentActivityQuery } from "../../../redux/services/digma";
import type { SlimEntrySpanData } from "../../../redux/services/types";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { ScopeChangeEvent } from "../../../types";
import { changeScope } from "../../../utils/actions/changeScope";
import { ConfigContext } from "../../common/App/ConfigContext";
import { actions } from "../actions";
import { EnvironmentInstructionsPanel } from "../EnvironmentInstructionsPanel";
import type { ViewMode } from "../EnvironmentPanel/types";
import { NoData } from "../NoData";
import { RecentActivityTable } from "../RecentActivityTable";
import { RecentActivityHeader } from "../RecentActivityToolbar";
import * as s from "./styles";
import type { RecentActivityContentProps } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const RecentActivityContent = ({
  environment,
  environmentInstructionsVisibility,
  headerHeight,
  clearDataTimestamp,
  onEnvironmentSetupInstructionsClose,
  now,
  viewMode,
  onViewModeChange
}: RecentActivityContentProps) => {
  const { isJaegerEnabled, backendInfo, userInfo } = useContext(ConfigContext);

  const { data, isLoading } = useGetRecentActivityQuery(
    {
      environments: environment ? [environment.id] : []
    },
    {
      skip: !userInfo?.id || !backendInfo || !environment,
      pollingInterval: REFRESH_INTERVAL,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true
    }
  );

  const filteredEntries = useMemo(
    () =>
      data?.entries.filter((entry) =>
        clearDataTimestamp
          ? new Date(entry.latestTraceTimestamp).valueOf() >
            new Date(clearDataTimestamp).valueOf()
          : true
      ) ?? [],
    [data?.entries, clearDataTimestamp]
  );

  const handleViewModeChange = (mode: ViewMode) => {
    onViewModeChange(mode);
  };

  const handleSpanLinkClick = (span: SlimEntrySpanData) => {
    if (environment) {
      changeScope({
        span: {
          spanCodeObjectId: span.spanCodeObjectId
        },
        context: {
          event: ScopeChangeEvent.RecentActivitySpanLinkClicked
        }
      });
    }
  };

  const handleTraceButtonClick = (traceId: string, span: SlimEntrySpanData) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        traceId,
        span: {
          scopeId: span.scopeId,
          displayText: span.displayText
        }
      }
    });
  };

  const handleEnvironmentSetupInstructionsClose = () => {
    onEnvironmentSetupInstructionsClose();
  };

  // Close the environment setup instructions panel if data exist and the panel is open by the user
  useEffect(() => {
    if (
      environment &&
      filteredEntries &&
      environmentInstructionsVisibility.isOpen &&
      !environmentInstructionsVisibility.keepOpen
    ) {
      onEnvironmentSetupInstructionsClose();
    }
  }, [
    filteredEntries,
    environmentInstructionsVisibility,
    environment,
    onEnvironmentSetupInstructionsClose
  ]);

  if (environment && environmentInstructionsVisibility.isOpen) {
    return (
      <EnvironmentInstructionsPanel
        environment={environment}
        onClose={
          environmentInstructionsVisibility.keepOpen
            ? handleEnvironmentSetupInstructionsClose
            : undefined
        }
      />
    );
  }

  if (isUndefined(data) && isLoading) {
    return (
      <>
        <s.NoDataRecentActivityContainerBackground>
          <s.NoDataRecentActivityContainerBackgroundGradient />
        </s.NoDataRecentActivityContainerBackground>
        <s.LoadingContainer>
          <s.Spinner size={32} />
        </s.LoadingContainer>
      </>
    );
  }

  if (!environment || filteredEntries.length === 0) {
    return (
      <>
        <s.NoDataRecentActivityContainerBackground>
          <s.NoDataRecentActivityContainerBackgroundGradient />
        </s.NoDataRecentActivityContainerBackground>
        {environment && (
          <s.NoDataRecentActivityHeader
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            environment={environment}
          />
        )}
        <s.NoDataContainer>
          <NoData />
        </s.NoDataContainer>
      </>
    );
  }

  return (
    <>
      <RecentActivityHeader
        showToolbar={true}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        environment={environment}
      />
      <RecentActivityTable
        viewMode={viewMode}
        data={filteredEntries}
        onSpanLinkClick={handleSpanLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        isTraceButtonVisible={Boolean(isJaegerEnabled)}
        headerHeight={headerHeight}
        now={now}
      />
    </>
  );
};
