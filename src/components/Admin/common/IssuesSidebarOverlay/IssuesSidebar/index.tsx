import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "styled-components";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../containers/Admin/hooks";
import {
  useGetAboutQuery,
  useGetIssuesQuery
} from "../../../../../redux/services/digma";
import { setIsInsightJiraTicketHintShown } from "../../../../../redux/slices/persistSlice";
import { isUndefined } from "../../../../../typeGuards/isUndefined";
import type { Scope } from "../../../../common/App/types";
import { CrossIcon } from "../../../../common/icons/16px/CrossIcon";
import { EyeIcon } from "../../../../common/icons/16px/EyeIcon";
import { TwoVerticalLinesIcon } from "../../../../common/icons/16px/TwoVerticalLinesIcon";
import { Pagination } from "../../../../common/Pagination";
import { NewButton } from "../../../../common/v3/NewButton";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { actions } from "../../../../Insights/actions";
import { EmptyState } from "../../../../Insights/EmptyState";
import { EmptyState as InsightsPageEmptyState } from "../../../../Insights/InsightsCatalog/InsightsPage/EmptyState";
import { InsightCardRenderer } from "../../../../Insights/InsightsCatalog/InsightsPage/InsightCardRenderer";
import { ViewMode } from "../../../../Insights/InsightsCatalog/types";
import { InsightTicketRenderer } from "../../../../Insights/InsightTicketRenderer";
import {
  InsightType,
  type CodeObjectInsight,
  type GenericCodeObjectInsight,
  type InsightTicketInfo
} from "../../../../Insights/types";
import { ScopeBar } from "../../../../Navigation/ScopeBar";
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
  title = "Issues"
}: IssuesSidebarProps) => {
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All);
  const [page, setPage] = useState(0);
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
  const { data, isFetching, refetch } = useGetIssuesQuery(
    {
      showDismissed: viewMode === ViewMode.OnlyDismissed,
      sortBy: "criticalinsights",
      sortOrder: "desc",
      page,
      pageSize: PAGE_SIZE,
      ...query
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
    onClose();
  };

  const handleDismissalViewModeButtonClick = () => {
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
  const pageStartItemNumber = page * PAGE_SIZE + 1;
  const pageEndItemNumber = Math.min(
    pageStartItemNumber + PAGE_SIZE - 1,
    totalCount
  );
  const isDismissalViewModeButtonVisible =
    data && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter

  const extendedScope: Scope = {
    span: {
      displayName: scopeDisplayName ?? query?.scopedSpanCodeObjectId ?? "",
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
    <s.Container $isResizing={isResizing}>
      <s.Header>
        <s.HeaderTitleRow>
          <span>{title}</span>
          <NewIconButton
            buttonType={"secondaryBorderless"}
            icon={CrossIcon}
            onClick={handleSidebarCloseButtonClick}
          />
        </s.HeaderTitleRow>
        {scopeDisplayName && (
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
        <s.ResizeHandle onMouseDown={onResizeHandleMouseDown}>
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
                  onRefresh={refresh}
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
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
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
              refreshInsights={refresh}
              onClose={handleJiraTicketPopupClose}
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
