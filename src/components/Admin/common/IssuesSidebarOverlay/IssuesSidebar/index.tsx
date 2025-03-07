import { useEffect, useRef, useState, type MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "styled-components";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../containers/Admin/hooks";
import {
  useGetAboutQuery,
  useGetIssuesQuery,
  useGetSpanInfoQuery
} from "../../../../../redux/services/digma";
import {
  INSIGHTS_SORTING_CRITERION,
  SORTING_ORDER
} from "../../../../../redux/services/types";
import { setIsInsightJiraTicketHintShown } from "../../../../../redux/slices/persistSlice";
import { isUndefined } from "../../../../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import type { Scope } from "../../../../common/App/types";
import { CrossIcon } from "../../../../common/icons/16px/CrossIcon";
import { EyeIcon } from "../../../../common/icons/16px/EyeIcon";
import { TwoVerticalLinesIcon } from "../../../../common/icons/16px/TwoVerticalLinesIcon";
import { Pagination } from "../../../../common/Pagination";
import { NewButton } from "../../../../common/v3/NewButton";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { EmptyState } from "../../../../Insights/EmptyState";
import { EmptyState as InsightsPageEmptyState } from "../../../../Insights/InsightsCatalog/InsightsPage/EmptyState";
import { InsightCardRenderer } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer";
import { actions } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/hooks/useDismissal";
import { ViewMode } from "../../../../Insights/InsightsCatalog/types";
import { InsightTicketRenderer } from "../../../../Insights/InsightTicketRenderer";
import {
  InsightType,
  type CodeObjectInsight,
  type GenericCodeObjectInsight,
  type InsightTicketInfo
} from "../../../../Insights/types";
import { ScopeBar } from "../../../../Navigation/ScopeBar";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import { SuggestionBar } from "./SuggestionBar";
import type { IssuesSidebarProps } from "./types";

const PAGE_SIZE = 10;

const getInsightToShowJiraHint = (insights: CodeObjectInsight[]): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpaNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.EndpointBottleneck,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimizationV2,
    InsightType.SpanScaling
  ];

  return insights.findIndex((insight) =>
    insightsWithJiraButton.includes(insight.type)
  );
};

export const IssuesSidebar = ({
  onClose,
  isTransitioning,
  isResizing,
  onResizeHandleMouseDown,
  query,
  scopeDisplayName,
  isPaginationEnabled = true,
  title = "Issues",
  onPageChange
}: IssuesSidebarProps) => {
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All);
  const [insightIdToOpenSuggestion, setInsightIdToOpenSuggestion] =
    useState<string>();
  const [isDrawerTransitioning, setIsDrawerTransitioning] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAdminDispatch();
  const isInsightJiraTicketHintShown = useAdminSelector(
    (state) => state.persist.isInsightJiraTicketHintShown
  );
  const isDrawerOpen = Boolean(insightIdToOpenSuggestion);
  const issuesListRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { data: about } = useGetAboutQuery();
  const { data: spanInfo, isLoading: isSpanInfoLoading } = useGetSpanInfoQuery(
    { spanCodeObjectId: query?.scopedSpanCodeObjectId ?? "" },
    {
      skip: !query?.scopedSpanCodeObjectId
    }
  );
  const scopeBarDisplayName = spanInfo?.displayName ?? scopeDisplayName;
  const page = query?.page ?? 0;
  const pageSize = query?.pageSize ?? PAGE_SIZE;
  const { data, isFetching, refetch } = useGetIssuesQuery({
    showDismissed: viewMode === ViewMode.OnlyDismissed,
    sortBy: INSIGHTS_SORTING_CRITERION.CRITICALITY,
    sortOrder: SORTING_ORDER.DESC,
    ...query,
    page,
    pageSize
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sendUserActionTrackingEvent(
          trackingEvents.ISSUES_SIDEBAR_ESCAPE_KEY_PRESSED
        );
        if (infoToOpenJiraTicket) {
          handleJiraTicketPopupClose();
        } else if (insightIdToOpenSuggestion) {
          handleSuggestionBarClose();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [infoToOpenJiraTicket, insightIdToOpenSuggestion, onClose]);

  const refresh = () => {
    void refetch();
  };

  const handleDismissalChange = (action: string, insightId: string) => {
    if (
      action === actions.UNDISMISS &&
      data?.insights.length === 1 &&
      data.insights[0].id === insightId
    ) {
      setViewMode(ViewMode.All);
    }
    refresh();
  };

  const handleSidebarCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUES_SIDEBAR_CLOSE_BUTTON_CLICKED
    );
    onClose();
  };

  const handleSidebarResizeHandleMouseDown = (e: MouseEvent) => {
    sendUserActionTrackingEvent(
      trackingEvents.ISSUES_SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_PRESSED
    );
    onResizeHandleMouseDown(e);
  };

  const handleChangePage = (page: number) => {
    sendUserActionTrackingEvent(trackingEvents.ISSUES_SIDEBAR_PAGE_CHANGED);
    onPageChange?.(page);
  };

  const handleDismissalViewModeButtonClick = () => {
    sendUserActionTrackingEvent(
      viewMode === ViewMode.All
        ? trackingEvents.ISSUES_SIDEBAR_SHOW_ALL_BUTTON_CLICKED
        : trackingEvents.ISSUES_SIDEBAR_SHOW_ONLY_DISMISSED_BUTTON_CLICKED
    );
    const newMode =
      viewMode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
    setViewMode(newMode);
  };

  const handleJiraTicketPopupOpen = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => {
    dispatch(setIsInsightJiraTicketHintShown(true));
    setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
  };

  const handleJiraTicketPopupClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleOpenSuggestion = (insightId: string) => {
    setInsightIdToOpenSuggestion(insightId);
  };

  const handleSuggestionBarClose = () => {
    setInsightIdToOpenSuggestion(undefined);
  };

  const handleDrawerTransitionStart = () => {
    setIsDrawerTransitioning(true);
  };

  const handleDrawerTransitionEnd = () => {
    setIsDrawerTransitioning(false);
  };

  const dismissedCount = data?.dismissedCount;
  const totalCount = data?.totalCount ?? 0;
  const pageStartItemNumber = page * pageSize + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + pageSize - 1,
    totalCount
  );
  const isDismissalViewModeButtonVisible =
    data && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter

  const extendedScope: Scope = {
    span: {
      displayName: scopeBarDisplayName ?? query?.scopedSpanCodeObjectId ?? "",
      spanCodeObjectId: query?.scopedSpanCodeObjectId ?? "",
      methodId: null,
      serviceName: null,
      role: null
    },
    code: {
      relatedCodeDetailsList: [],
      codeDetailsList: []
    },
    hasErrors: false,
    issuesInsightsCount: 0,
    analyticsInsightsCount: 0,
    unreadInsightsCount: 0
  };

  return (
    <s.Container $isResizing={isResizing} className={"issues-sidebar"}>
      <s.Header>
        <s.HeaderTitleRow>
          <span>{title}</span>
          <NewIconButton
            buttonType={"secondaryBorderless"}
            icon={CrossIcon}
            onClick={handleSidebarCloseButtonClick}
          />
        </s.HeaderTitleRow>
        {!isSpanInfoLoading && scopeBarDisplayName && (
          <ScopeBar
            isExpanded={false}
            isSpanInfoEnabled={false}
            linkedEndpoints={[]}
            scope={extendedScope}
            isTargetButtonMenuVisible={false}
          />
        )}
      </s.Header>
      <s.ContentContainer>
        <s.ResizeHandle onMouseDown={handleSidebarResizeHandleMouseDown}>
          <TwoVerticalLinesIcon size={16} color={"currentColor"} />
        </s.ResizeHandle>
        {data ? (
          data.insights.length > 0 ? (
            <s.IssuesList ref={issuesListRef}>
              {data.insights.map((insight, i) => (
                <InsightCardRenderer
                  key={insight.id}
                  insight={insight}
                  onJiraTicketCreate={handleJiraTicketPopupOpen}
                  isJiraHintEnabled={
                    !isInsightJiraTicketHintShown &&
                    !isDrawerOpen &&
                    !isDrawerTransitioning &&
                    !isTransitioning &&
                    i === getInsightToShowJiraHint(data.insights)
                  }
                  isMarkAsReadButtonEnabled={false}
                  viewMode={"full"}
                  onDismissalChange={handleDismissalChange}
                  onOpenSuggestion={handleOpenSuggestion}
                  tooltipBoundaryRef={issuesListRef}
                  backendInfo={about ?? null}
                />
              ))}
            </s.IssuesList>
          ) : (
            <InsightsPageEmptyState
              preset={
                viewMode === ViewMode.All ? "noDataYet" : "noDismissedData"
              }
            />
          )
        ) : (
          isFetching && <EmptyState preset={"loading"} />
        )}
      </s.ContentContainer>
      <s.Footer>
        {isPaginationEnabled && totalCount > 0 && (
          <>
            <Pagination
              itemsCount={totalCount}
              page={page}
              pageSize={pageSize}
              onPageChange={handleChangePage}
              extendedNavigation={true}
            />
            <s.FooterItemsCount>
              Showing{" "}
              <s.FooterPageItemsCount>
                {pageStartItemNumber} - {pageEndItemNumber}
              </s.FooterPageItemsCount>{" "}
              of {totalCount}
            </s.FooterItemsCount>
          </>
        )}
        {isDismissalViewModeButtonVisible && (
          <NewButton
            buttonType={"secondaryBorderless"}
            icon={(props) => (
              <EyeIcon
                {...props}
                crossOut={viewMode !== ViewMode.OnlyDismissed}
                color={
                  viewMode === ViewMode.OnlyDismissed
                    ? theme.colors.v3.icon.brandSecondary
                    : props.color
                }
              />
            )}
            onClick={handleDismissalViewModeButtonClick}
          />
        )}
      </s.Footer>
      {infoToOpenJiraTicket && (
        <s.Overlay>
          <s.PopupContainer>
            <InsightTicketRenderer
              data={infoToOpenJiraTicket}
              onClose={handleJiraTicketPopupClose}
              backendInfo={about ?? null}
            />
          </s.PopupContainer>
        </s.Overlay>
      )}
      <CSSTransition
        in={isDrawerOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.drawerTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={drawerRef}
        onEnter={handleDrawerTransitionStart}
        onEntered={handleDrawerTransitionEnd}
        onExit={handleDrawerTransitionStart}
        onExited={handleDrawerTransitionEnd}
      >
        <s.Overlay>
          <s.DrawerContainer
            ref={drawerRef}
            $transitionClassName={s.drawerTransitionClassName}
            $transitionDuration={s.TRANSITION_DURATION}
          >
            <SuggestionBar
              insightId={insightIdToOpenSuggestion}
              onClose={handleSuggestionBarClose}
            />
          </s.DrawerContainer>
        </s.Overlay>
      </CSSTransition>
    </s.Container>
  );
};
