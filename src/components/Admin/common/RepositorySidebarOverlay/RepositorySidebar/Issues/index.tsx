import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../../containers/Admin/hooks";
import {
  useGetAboutQuery,
  useGetEnvironmentsQuery,
  useGetIssuesQuery
} from "../../../../../../redux/services/digma";
import {
  InsightsSortingCriterion,
  SortingOrder
} from "../../../../../../redux/services/types";
import { setIsInsightJiraTicketHintShown } from "../../../../../../redux/slices/persistSlice";
import {
  setIssuesInsightIdToOpenSuggestion,
  setIssuesInsightInfoToOpenTicket
} from "../../../../../../redux/slices/repositorySlice";
import { useInsightsSelector } from "../../../../../../store/insights/useInsightsSelector";
import { ViewMode } from "../../../../../Insights/InsightsCatalog/types";
import { InsightsContent } from "../../../../../Insights/InsightsContent";
import { type GenericCodeObjectInsight } from "../../../../../Insights/types";
import { SuggestionBar } from "../SuggestionBar";
import * as s from "./styles";
import type { IssuesProps } from "./types";

const PAGE_SIZE = 10;

export const Issues = ({
  isTransitioning,
  query,
  onScopeChange,
  onGoToTab
}: IssuesProps) => {
  const { page, viewMode } = useInsightsSelector();
  const { data: environments } = useGetEnvironmentsQuery();
  // const [page, setPage] = useState(0);
  // const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All);
  const [isDrawerTransitioning, setIsDrawerTransitioning] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAdminDispatch();
  // const insightInfoToOpenTicket = useAdminSelector(
  //   (state) => state.repository.issues.insightInfoToOpenTicket
  // );
  const insightIdToOpenSuggestion = useAdminSelector(
    (state) => state.repository.issues.insightIdToOpenSuggestion
  );
  // const isInsightJiraTicketHintShown = useAdminSelector(
  //   (state) => state.persist.isInsightJiraTicketHintShown
  // );
  const isDrawerOpen = Boolean(insightIdToOpenSuggestion);
  // const issuesListRef = useRef<HTMLDivElement>(null);
  // const theme = useTheme();

  const { data: about } = useGetAboutQuery();

  const pageSize = query?.pageSize ?? PAGE_SIZE;
  const { data, isFetching, refetch } = useGetIssuesQuery({
    showDismissed: viewMode === ViewMode.OnlyDismissed,
    sortBy: InsightsSortingCriterion.Criticality,
    sortOrder: SortingOrder.Desc,
    ...query,
    page,
    pageSize
  });

  const handleRefresh = () => {
    void refetch();
  };

  // const refresh = () => {
  //   void refetch();
  // };

  // const handleDismissalChange = (action: string, insightId: string) => {
  //   if (
  //     action === actions.UNDISMISS &&
  //     data?.insights.length === 1 &&
  //     data.insights[0].id === insightId
  //   ) {
  //     setViewMode(ViewMode.All);
  //   }
  //   refresh();
  // };

  // const handleChangePage = (page: number) => {
  //   sendUserActionTrackingEvent(trackingEvents.ISSUES_PAGE_CHANGED);
  //   setPage(page);
  // };

  // const handleDismissalViewModeButtonClick = () => {
  //   sendUserActionTrackingEvent(
  //     viewMode === ViewMode.All
  //       ? trackingEvents.ISSUES_SHOW_ALL_BUTTON_CLICKED
  //       : trackingEvents.ISSUES_SHOW_ONLY_DISMISSED_BUTTON_CLICKED
  //   );
  //   const newMode =
  //     viewMode === ViewMode.All ? ViewMode.OnlyDismissed : ViewMode.All;
  //   setViewMode(newMode);
  // };

  const handleJiraTicketPopupOpen = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId?: string
  ) => {
    dispatch(setIsInsightJiraTicketHintShown(true));
    dispatch(setIssuesInsightInfoToOpenTicket({ insight, spanCodeObjectId }));
  };

  const handleJiraTicketPopupClose = () => {
    dispatch(setIssuesInsightInfoToOpenTicket(null));
  };

  const handleOpenSuggestion = (insightId: string) => {
    dispatch(setIssuesInsightIdToOpenSuggestion(insightId));
  };

  const handleSuggestionBarClose = () => {
    dispatch(setIssuesInsightIdToOpenSuggestion(null));
  };

  const handleDrawerTransitionStart = () => {
    setIsDrawerTransitioning(true);
  };

  const handleDrawerTransitionEnd = () => {
    setIsDrawerTransitioning(false);
  };

  // const handleScopeChange = (payload: ChangeScopePayload) => {
  //   onScopeChange(payload);
  // };

  // const dismissedCount = data?.dismissedCount;
  // const totalCount = data?.totalCount ?? 0;
  // const pageStartItemNumber = page * pageSize + 1;
  // const pageEndItemNumber = Math.min(
  //   pageStartItemNumber + pageSize - 1,
  //   totalCount
  // );
  // const isDismissalViewModeButtonVisible =
  //   data && (isUndefined(dismissedCount) || dismissedCount > 0); // isUndefined - check for backward compatibility, always show when BE does not return this counter
  // const isAtHome = !query?.scopedSpanCodeObjectId;

  // useEffect(() => {
  //   setPage(0);
  // }, [viewMode, query]);

  // useEffect(() => {
  //   issuesListRef.current?.scrollTo(0, 0);
  // }, [page, viewMode, query]);

  return (
    <s.Container>
      {/* <s.ContentContainer>
        {isFetching ? (
          <EmptyState preset={"loading"} />
        ) : data ? (
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
                  viewMode={isAtHome ? "compact" : "full"}
                  onDismissalChange={handleDismissalChange}
                  onOpenSuggestion={handleOpenSuggestion}
                  tooltipBoundaryRef={issuesListRef}
                  backendInfo={about ?? null}
                  onScopeChange={handleScopeChange}
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
        ) : null}
      </s.ContentContainer>
      <s.Footer>
        {totalCount > 0 && (
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
      {insightInfoToOpenTicket && (
        <s.Overlay>
          <s.PopupContainer>
            <InsightTicketRenderer
              data={insightInfoToOpenTicket}
              onClose={handleJiraTicketPopupClose}
              backendInfo={about ?? null}
            />
          </s.PopupContainer>
        </s.Overlay>
      )} */}
      <InsightsContent
        insightViewType={"Issues"}
        onScopeChange={onScopeChange}
        onGoToTab={onGoToTab}
        backendInfo={about ?? null}
        environments={environments}
        isLoading={isFetching}
        data={data ?? null}
        onRefresh={handleRefresh}
      />
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
              insightId={insightIdToOpenSuggestion ?? undefined}
              onClose={handleSuggestionBarClose}
            />
          </s.DrawerContainer>
        </s.Overlay>
      </CSSTransition>
    </s.Container>
  );
};
