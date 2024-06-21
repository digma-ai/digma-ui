import {
  KeyboardEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { usePrevious } from "../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isNumber } from "../../typeGuards/isNumber";
import { openURLInDefaultBrowser } from "../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../common/App/ConfigContext";
import { CircleLoader } from "../common/CircleLoader";
import { EmptyState } from "../common/EmptyState";
import { RegistrationDialog } from "../common/RegistrationDialog";
import { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { SORTING_ORDER } from "../common/SortingSelector/types";
import { CardsIcon } from "../common/icons/CardsIcon";
import { DocumentWithMagnifierIcon } from "../common/icons/DocumentWithMagnifierIcon";
import { LightBulbSmallCrossedIcon } from "../common/icons/LightBulbSmallCrossedIcon";
import { LightBulbSmallIcon } from "../common/icons/LightBulbSmallIcon";
import { OpenTelemetryLogoCrossedSmallIcon } from "../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { InsightsCatalog } from "./InsightsCatalog";
import { SORTING_CRITERION } from "./InsightsCatalog/types";
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
  InsightsQuery,
  InsightsStatus,
  SpaNPlusOneInsight,
  SpanEndpointBottleneckInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight
} from "./types";
import { useInsightsData } from "./useInsightsData";

const REFRESH_INTERVAL = isNumber(window.insightsRefreshInterval)
  ? window.insightsRefreshInterval
  : 10 * 1000; // in milliseconds

const renderInsightTicket = (
  data: InsightTicketInfo<GenericCodeObjectInsight>,
  onClose: () => void
) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpaNPlusOneInsight>;
    return <SpaNPlusOneInsightTicket data={ticketData} onClose={onClose} />;
  }

  if (isEndpointSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointSpanNPlusOneInsight>;
    return (
      <EndpointSpanNPlusOneInsightTicket data={ticketData} onClose={onClose} />
    );
  }

  if (isSpanEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanEndpointBottleneckInsight>;
    return (
      <SpanEndpointBottleneckInsightTicket
        data={ticketData}
        onClose={onClose}
      />
    );
  }

  if (isEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointBottleneckInsight>;
    return (
      <EndpointBottleneckInsightTicket data={ticketData} onClose={onClose} />
    );
  }

  if (isSpanQueryOptimizationInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanQueryOptimizationInsight>;
    return (
      <SpanQueryOptimizationInsightTicket data={ticketData} onClose={onClose} />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointQueryOptimizationV2Insight>;
    return (
      <EndpointQueryOptimizationV2InsightTicket
        data={ticketData}
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
          onClose={onClose}
        />
      );
    } else {
      return <SpanScalingInsightTicket data={ticketData} onClose={onClose} />;
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

export const Insights = ({ insightViewType }: InsightsProps) => {
  const DEFAULT_QUERY: InsightsQuery = {
    page: 0,
    sorting: {
      criterion: SORTING_CRITERION.LATEST,
      order: SORTING_ORDER.DESC
    },
    searchQuery: null,
    showDismissed: false,
    insightViewType,
    showUnreadOnly: false,
    filters: []
  };
  // const [isAutofixing, setIsAutofixing] = useState(false);
  const [query, setQuery] = useState<InsightsQuery>(DEFAULT_QUERY);
  const { isInitialLoading, data, refresh } = useInsightsData({
    refreshInterval: REFRESH_INTERVAL,
    query
  });
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const config = useContext(ConfigContext);
  const previousUserRegistrationEmail = usePrevious(
    config.userRegistrationEmail
  );
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const isRegistrationEnabled = false;
  const isRegistrationRequired =
    isRegistrationEnabled && !config.userRegistrationEmail;

  useLayoutEffect(() => {
    sendMessage(globalActions.GET_STATE);
  }, []);

  // useEffect(() => {
  //   if (previousData && data && previousData.assetId !== data.assetId) {
  //     setIsAutofixing(false);
  //   }
  // }, [previousData, data]);

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== config.userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    config.userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  // const handleMethodSelect = (method: Method) => {
  //   sendMessage(actions.GO_TO_METHOD, method);
  // };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  // const handleAddAnnotationButtonClick = () => {
  //   sendMessage(actions.ADD_ANNOTATION, {
  //     methodId: data?.assetId
  //   });
  // };

  // const handleAutofixLinkClick = () => {
  //   if (!isAutofixing) {
  //     sendMessage(actions.AUTOFIX_MISSING_DEPENDENCY, {
  //       methodId: data?.assetId
  //     });
  //     setIsAutofixing(true);
  //   }
  // };

  // const handleTroubleshootingLinkClick = () => {
  //   sendUserActionTrackingEvent(
  //     globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED,
  //     {
  //       origin: "insights"
  //     }
  //   );

  //   sendMessage(globalActions.OPEN_TROUBLESHOOTING_GUIDE);
  // };

  const handleJiraTicketPopupOpen = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => {
    setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
  };

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

  const handleQueryChange = (query: InsightsQuery) => {
    setQuery(query);
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setInfoToOpenJiraTicket(undefined);
    }
  };

  const renderDefaultContent = (data: InsightsData): JSX.Element => {
    return (
      <InsightsCatalog
        insightViewType={insightViewType}
        insights={data.insights}
        totalCount={data.totalCount}
        onJiraTicketCreate={handleJiraTicketPopupOpen}
        onQueryChange={handleQueryChange}
        onRefresh={refresh}
        defaultQuery={DEFAULT_QUERY}
        dismissedCount={data.dismissedCount}
        unreadCount={data.unreadCount}
      />
    );
  };

  const renderContent = (
    data: InsightsData,
    isInitialLoading: boolean
  ): JSX.Element => {
    if (isInitialLoading) {
      return <EmptyState content={<CircleLoader size={32} />} />;
    }

    if (!config.environments?.length) {
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
                {/* {data.hasMissingDependency && (
                  <s.MissingDependencyContainer>
                    <s.MissingDependencyText>
                      missing dependency: opentelemetry.annotation
                    </s.MissingDependencyText>
                    <s.Link onClick={handleAutofixLinkClick}>Autofix</s.Link>
                  </s.MissingDependencyContainer>
                )} */}
                {/* {data.canInstrumentMethod && (
                  <Button
                    onClick={handleAddAnnotationButtonClick}
                    disabled={data.hasMissingDependency}
                  >
                    Add annotation
                  </Button>
                )} */}
              </>
            }
          />
        );
      case InsightsStatus.DEFAULT:
      default:
        return renderDefaultContent(data);
    }
  };

  return (
    <s.Container>
      {renderContent(data, isInitialLoading)}
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
                handleJiraTicketPopupClose
              )
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
