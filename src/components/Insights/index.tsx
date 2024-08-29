import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { useGlobalStore } from "../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../containers/Main/stores/useInsightsStore";
import { useScopeStore } from "../../containers/Main/stores/useScopeStore";
import { useStore } from "../../containers/Main/stores/useStore";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isUndefined } from "../../typeGuards/isUndefined";
import { openURLInDefaultBrowser } from "../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { areBackendInfosEqual } from "../../utils/areBackendInfosEqual";
import { CircleLoader } from "../common/CircleLoader";
import { EmptyState } from "../common/EmptyState";
import { RegistrationDialog } from "../common/RegistrationDialog";
import { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { CardsIcon } from "../common/icons/CardsIcon";
import { DocumentWithMagnifierIcon } from "../common/icons/DocumentWithMagnifierIcon";
import { LightBulbSmallCrossedIcon } from "../common/icons/LightBulbSmallCrossedIcon";
import { LightBulbSmallIcon } from "../common/icons/LightBulbSmallIcon";
import { OpenTelemetryLogoCrossedSmallIcon } from "../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { InsightsCatalog } from "./InsightsCatalog";
import { IssuesFilterQuery } from "./Issues/IssuesFilter/types";
import { EndpointBottleneckInsightTicket } from "./insightTickets/EndpointBottleneckInsightTicket";
import { EndpointHighNumberOfQueriesInsightTicket } from "./insightTickets/EndpointHighNumberOfQueriesInsightTicket";
import { EndpointQueryOptimizationV2InsightTicket } from "./insightTickets/EndpointQueryOptimizationV2InsightTicket";
import { EndpointSpanNPlusOneInsightTicket } from "./insightTickets/EndpointSpanNPlusOneInsightTicket";
import { SpaNPlusOneInsightTicket } from "./insightTickets/SpaNPlusOneInsightTicket";
import { SpanEndpointBottleneckInsightTicket } from "./insightTickets/SpanEndpointBottleneckInsightTicket";
import { SpanQueryOptimizationInsightTicket } from "./insightTickets/SpanQueryOptimizationInsightTicket";
import { SpanScalingByRootCauseInsightTicket } from "./insightTickets/SpanScalingByRootCauseInsightTicket";
import { SpanScalingInsightTicket } from "./insightTickets/SpanScalingInsightTicket";
import * as s from "./styles";
import {
  isEndpointBottleneckInsight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointQueryOptimizationV2Insight,
  isEndpointSpanNPlusOneInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight
} from "./typeGuards";
import {
  EndpointBottleneckInsight,
  EndpointHighNumberOfQueriesInsight,
  EndpointQueryOptimizationV2Insight,
  EndpointSpanNPlusOneInsight,
  GenericCodeObjectInsight,
  InsightTicketInfo,
  InsightsData,
  InsightsProps,
  InsightsStatus,
  SpaNPlusOneInsight,
  SpanEndpointBottleneckInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight
} from "./types";
import { useInsightsData } from "./useInsightsData";

const renderInsightTicket = (
  data: InsightTicketInfo<GenericCodeObjectInsight>,
  refreshInsights: () => void,
  onClose: () => void
) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpaNPlusOneInsight>;
    return (
      <SpaNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointSpanNPlusOneInsight>;
    return (
      <EndpointSpanNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanEndpointBottleneckInsight>;
    return (
      <SpanEndpointBottleneckInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointBottleneckInsight>;
    return (
      <EndpointBottleneckInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanQueryOptimizationInsight>;
    return (
      <SpanQueryOptimizationInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointQueryOptimizationV2Insight>;
    return (
      <EndpointQueryOptimizationV2InsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointHighNumberOfQueriesInsight>;
    return (
      <EndpointHighNumberOfQueriesInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanScalingBadlyInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanScalingInsight>;
    const selectedRootCause = data.insight.rootCauseSpans.find(
      (r) => r.spanCodeObjectId == data.spanCodeObjectId
    );
    if (selectedRootCause) {
      return (
        <SpanScalingByRootCauseInsightTicket
          rootCauseSpanInfo={selectedRootCause}
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
        />
      );
    } else {
      return (
        <SpanScalingInsightTicket
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
        />
      );
    }
  }

  return null;
};

const NoDataYet = () => {
  const handleTroubleshootingLinkClick = () => {
    sendUserActionTrackingEvent(
      globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED,
      {
        origin: "insights"
      }
    );

    sendMessage(globalActions.OPEN_TROUBLESHOOTING_GUIDE);
  };

  return (
    <EmptyState
      icon={CardsIcon}
      title={"No data yet"}
      content={
        <>
          <s.EmptyStateDescription>
            Trigger actions that call this application to learn more about its
            runtime behavior
          </s.EmptyStateDescription>
          <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
            Not seeing your application data?
          </s.TroubleshootingLink>
        </>
      }
    />
  );
};

const sendMessage = (action: string, data?: object) => {
  return window.sendMessageToDigma({
    action,
    payload: {
      ...data
    }
  });
};

export const ISSUES_FILTERS_PERSISTENCE_KEY = "issuesFilters";

export const Insights = ({ insightViewType }: InsightsProps) => {
  const [areFiltersRehydrated, setAreFiltersRehydrated] = useState(false);
  const [persistedFilters, setPersistedFilters] =
    usePersistence<IssuesFilterQuery>(
      ISSUES_FILTERS_PERSISTENCE_KEY,
      "project"
    );
  const previousPersistedFilters = usePrevious(persistedFilters);
  const { data, isLoading, refresh } = useInsightsData({
    areFiltersRehydrated
  });
  const reset = useStore().reset;
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const userRegistrationEmail = useGlobalStore().userRegistrationEmail;
  const previousUserRegistrationEmail = usePrevious(userRegistrationEmail);
  const environments = useGlobalStore().environments;
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const isRegistrationEnabled = false;
  const isRegistrationRequired =
    isRegistrationEnabled && !userRegistrationEmail;
  const { setInsightViewType, setFilteredInsightTypes, setFilters } =
    useStore.getState();
  const {
    insightViewType: storedInsightViewType,
    filteredInsightTypes,
    filters
  } = useInsightsStore();
  const { backendInfo, environment } = useGlobalStore();
  const previousFilteredInsightTypes = usePrevious(filteredInsightTypes);
  const previousFilters = usePrevious(filters);
  const previousBackendInfo = usePrevious(backendInfo);
  const scope = useScopeStore().scope;
  const scopeSpanCodeObjectId = scope?.span?.spanCodeObjectId;
  const previousScope = usePrevious(scope);
  const previousScopeSpanCodeObjectId = previousScope?.span?.spanCodeObjectId;
  const environmentId = environment?.id;
  const previousEnvironmentId = usePrevious(environmentId);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    setInsightViewType(insightViewType);
  }, [insightViewType, setInsightViewType]);

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  // Rehydrate filters from persistence
  useEffect(() => {
    if (
      isUndefined(previousPersistedFilters) &&
      !isUndefined(persistedFilters)
    ) {
      setFilteredInsightTypes(persistedFilters?.issueTypes ?? []);
      setFilters(persistedFilters?.filters ?? []);
      setAreFiltersRehydrated(true);
    }
  }, [
    previousPersistedFilters,
    persistedFilters,
    setFilters,
    setFilteredInsightTypes
  ]);

  // Persist filters on its change
  useEffect(() => {
    if (
      (previousFilteredInsightTypes !== filteredInsightTypes ||
        previousFilters !== filters) &&
      areFiltersRehydrated
    ) {
      setPersistedFilters({
        issueTypes: filteredInsightTypes,
        filters
      });
    }
  }, [
    previousFilteredInsightTypes,
    filteredInsightTypes,
    previousFilters,
    filters,
    setPersistedFilters,
    areFiltersRehydrated,
    persistedFilters
  ]);

  // Reset filters on backend instance, scope or environment change
  useEffect(() => {
    if (
      (areFiltersRehydrated &&
        Boolean(
          previousBackendInfo &&
            !areBackendInfosEqual(previousBackendInfo, backendInfo)
        )) ||
      Boolean(
        previousScope && previousScopeSpanCodeObjectId !== scopeSpanCodeObjectId
      ) ||
      Boolean(previousEnvironmentId && previousEnvironmentId !== environmentId)
    ) {
      setFilteredInsightTypes([]);
      setFilters([]);
    }
  }, [
    previousBackendInfo,
    backendInfo,
    previousScope,
    previousScopeSpanCodeObjectId,
    scopeSpanCodeObjectId,
    areFiltersRehydrated,
    persistedFilters,
    setFilteredInsightTypes,
    setFilters,
    previousEnvironmentId,
    environmentId
  ]);

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleJiraTicketPopupOpen = useCallback(
    (insight: GenericCodeObjectInsight, spanCodeObjectId?: string) => {
      setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
    },
    []
  );

  const handleJiraTicketPopupClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    sendMessage(globalActions.PERSONALIZE_REGISTER, {
      ...formData,
      scope: "insights view jira ticket info"
    });

    setIsRegistrationInProgress(true);
  };

  const handleRegistrationDialogClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setInfoToOpenJiraTicket(undefined);
    }
  };

  const renderContent = (
    data: InsightsData | null,
    isLoading: boolean
  ): JSX.Element => {
    const isInitialLoading =
      (!data && isLoading) ||
      !backendInfo ||
      !storedInsightViewType ||
      !areFiltersRehydrated;
    if (isInitialLoading) {
      return <EmptyState content={<CircleLoader size={32} />} />;
    }

    if (!environments?.length) {
      return <NoDataYet />;
    }

    switch (data?.insightsStatus) {
      case InsightsStatus.STARTUP:
        return (
          <EmptyState
            title={"Nothing to show"}
            icon={DocumentWithMagnifierIcon}
            content={
              <>
                <s.StartupText>
                  <s.EmptyStateDescription>
                    Navigate to any code file in your workspace,
                  </s.EmptyStateDescription>
                  <s.EmptyStateDescription>
                    or click a recent activity,
                  </s.EmptyStateDescription>
                  <s.EmptyStateDescription>
                    to see runtime data and insights here.
                  </s.EmptyStateDescription>
                </s.StartupText>
                <s.SlackLink onClick={handleSlackLinkClick}>
                  <SlackLogoIcon size={14} />
                  Join Our Slack Channel for Support
                </s.SlackLink>
              </>
            }
          />
        );
      case InsightsStatus.NO_INSIGHTS:
        return (
          <EmptyState icon={LightBulbSmallCrossedIcon} title={"No insights"} />
        );
      case InsightsStatus.INSIGHT_PENDING:
        return (
          <EmptyState
            icon={LightBulbSmallIcon}
            title={"Processing insights..."}
          />
        );
      case InsightsStatus.NO_SPANS_DATA:
        return <NoDataYet />;
      case InsightsStatus.NO_OBSERVABILITY:
        return (
          <EmptyState
            icon={OpenTelemetryLogoCrossedSmallIcon}
            title={"No observability"}
            content={
              <>
                <s.EmptyStateDescription>
                  Add an annotation to observe this method and collect data
                  about its runtime behavior
                </s.EmptyStateDescription>
              </>
            }
          />
        );
      case InsightsStatus.DEFAULT:
      default:
        return (
          <InsightsCatalog
            onJiraTicketCreate={handleJiraTicketPopupOpen}
            onRefresh={refresh}
          />
        );
    }
  };

  return (
    <s.Container>
      {renderContent(data, isLoading)}
      {infoToOpenJiraTicket && (
        <s.Overlay onKeyDown={handleOverlayKeyDown} tabIndex={-1}>
          <s.PopupContainer>
            {isRegistrationRequired ? (
              <RegistrationDialog
                onSubmit={handleRegistrationSubmit}
                onClose={handleRegistrationDialogClose}
                isRegistrationInProgress={isRegistrationInProgress}
              />
            ) : (
              renderInsightTicket(
                infoToOpenJiraTicket,
                refresh,
                handleJiraTicketPopupClose
              )
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
