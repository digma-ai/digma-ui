import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { usePrevious } from "../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../trackingEvents";
import { isNumber } from "../../typeGuards/isNumber";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
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
import { useInsightsData } from "./common/useInsightsData";
import * as s from "./styles";
import { BottleneckInsightTicket } from "./tickets/BottleneckInsightTicket";
import { EndpointHighNumberOfQueriesInsightTicket } from "./tickets/EndpointHighNumberOfQueriesInsightTicket";
import { EndpointNPlusOneInsightTicket } from "./tickets/EndpointNPlusOneInsightTicket";
import { EndpointQueryOptimizationInsightTicket } from "./tickets/EndpointQueryOptimizationTicket";
import { NPlusOneInsightTicket } from "./tickets/NPlusOneInsightTicket";
import { QueryOptimizationInsightTicket } from "./tickets/QueryOptimizationInsightTicket";
import { SpanBottleneckInsightTicket } from "./tickets/SpanBottleneckInsightTicket";
import {
  isEndpointHighNumberOfQueriesInsight,
  isEndpointQueryOptimizationInsight,
  isEndpointSlowestSpansInsight,
  isEndpointSuspectedNPlusOneInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanQueryOptimizationInsight
} from "./typeGuards";
import {
  EndpointHighNumberOfQueriesInsight,
  EndpointQueryOptimizationInsight,
  EndpointSlowestSpansInsight,
  EndpointSuspectedNPlusOneInsight,
  GenericCodeObjectInsight,
  InsightTicketInfo,
  InsightsData,
  InsightsProps,
  InsightsQuery,
  InsightsStatus,
  QueryOptimizationInsight,
  SpanEndpointBottleneckInsight,
  SpanNPlusOneInsight
} from "./types";

const REFRESH_INTERVAL = isNumber(window.insightsRefreshInterval)
  ? window.insightsRefreshInterval
  : 10 * 1000; // in milliseconds

const DEFAULT_QUERY = {
  page: 0,
  sorting: {
    criterion: SORTING_CRITERION.CRITICAL_INSIGHTS,
    order: SORTING_ORDER.DESC
  },
  searchQuery: null
};

const renderInsightTicket = (
  data: InsightTicketInfo<GenericCodeObjectInsight>,
  onClose: () => void
) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanNPlusOneInsight>;
    return <NPlusOneInsightTicket data={ticketData} onClose={onClose} />;
  }

  if (
    isEndpointSuspectedNPlusOneInsight(data.insight) &&
    data.spanCodeObjectId
  ) {
    const ticketData =
      data as InsightTicketInfo<EndpointSuspectedNPlusOneInsight>;
    return (
      <EndpointNPlusOneInsightTicket data={ticketData} onClose={onClose} />
    );
  }

  if (isSpanEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanEndpointBottleneckInsight>;
    return <BottleneckInsightTicket data={ticketData} onClose={onClose} />;
  }

  if (isEndpointSlowestSpansInsight(data.insight) && data.spanCodeObjectId) {
    const ticketData = data as InsightTicketInfo<EndpointSlowestSpansInsight>;
    return <SpanBottleneckInsightTicket data={ticketData} onClose={onClose} />;
  }

  if (isSpanQueryOptimizationInsight(data.insight) && data.spanCodeObjectId) {
    const ticketData = data as InsightTicketInfo<QueryOptimizationInsight>;
    return (
      <QueryOptimizationInsightTicket data={ticketData} onClose={onClose} />
    );
  }

  if (
    isEndpointQueryOptimizationInsight(data.insight) &&
    data.spanCodeObjectId
  ) {
    const ticketData =
      data as InsightTicketInfo<EndpointQueryOptimizationInsight>;
    return (
      <EndpointQueryOptimizationInsightTicket
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

  return null;
};

const sendMessage = (action: string, data?: object) => {
  return window.sendMessageToDigma({
    action,
    payload: {
      ...data
    }
  });
};

export const Insights = (props: InsightsProps) => {
  const [isAutofixing, setIsAutofixing] = useState(false);
  const [query, setQuery] = useState<InsightsQuery>(DEFAULT_QUERY);
  const { isLoading, isInitialLoading, data, refresh } = useInsightsData({
    refreshInterval: REFRESH_INTERVAL,
    data: props.data,
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

  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "insights"
    });

    sendMessage(globalActions.OPEN_TROUBLESHOOTING_GUIDE);
  };

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
    sendMessage(globalActions.REGISTER, {
      ...formData,
      scope: "insights view jira ticket info"
    });

    setIsRegistrationInProgress(true);
  };

  const handleRegistrationDialogClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const renderDefaultContent = (data: InsightsData): JSX.Element => {
    return (
      <InsightsCatalog
        insights={data.insights}
        totalCount={data.totalCount}
        onJiraTicketCreate={handleJiraTicketPopupOpen}
        onQueryChange={(query: InsightsQuery) => {
          setQuery(query);
        }}
        onRefresh={refresh}
        defaultQuery={DEFAULT_QUERY}
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
        return (
          <EmptyState
            icon={CardsIcon}
            title={"No data yet"}
            content={
              <>
                <s.EmptyStateDescription>
                  Trigger actions that call this application to learn more about
                  its runtime behavior
                </s.EmptyStateDescription>
                <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
                  Not seeing your application data?
                </s.TroubleshootingLink>
              </>
            }
          />
        );
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
      {isLoading && (
        <s.CircleLoaderContainer>
          <CircleLoader size={14} />
        </s.CircleLoaderContainer>
      )}
      {renderContent(data, isInitialLoading)}
      {infoToOpenJiraTicket && (
        <s.Overlay>
          <s.PopupContainer>
            {config.userRegistrationEmail ? (
              renderInsightTicket(
                infoToOpenJiraTicket,
                handleJiraTicketPopupClose
              )
            ) : (
              <RegistrationDialog
                onSubmit={handleRegistrationSubmit}
                onClose={handleRegistrationDialogClose}
                isRegistrationInProgress={isRegistrationInProgress}
              />
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
