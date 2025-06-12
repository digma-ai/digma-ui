import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../../containers/Admin/hooks";
import { setIsInsightJiraTicketHintShown } from "../../../../../../redux/slices/persistSlice";
import {
  setIssuesInsightIdToOpenSuggestion,
  setIssuesInsightInfoToOpenTicket,
  setScope
} from "../../../../../../redux/slices/repositorySlice";
import { useStore } from "../../../../../../store/useStore";
import { useInsightsData } from "../../../../../Insights/hooks/useInsightsData";
import { InsightsContent } from "../../../../../Insights/InsightsContent";
import type { GenericCodeObjectInsight } from "../../../../../Insights/types";
import { SuggestionBar } from "../SuggestionBar";
import * as s from "./styles";
import type { IssuesProps } from "./types";

export const Issues = ({
  isTransitioning,
  query,
  onScopeChange,
  onGoToTab
}: IssuesProps) => {
  const { setInsightViewType } = useStore.getState();
  const [isDrawerTransitioning, setIsDrawerTransitioning] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAdminDispatch();
  const insightInfoToOpenTicket = useAdminSelector(
    (state) => state.repository.issues.insightInfoToOpenTicket
  );
  const insightIdToOpenSuggestion = useAdminSelector(
    (state) => state.repository.issues.insightIdToOpenSuggestion
  );
  const isInsightJiraTicketHintShown = useAdminSelector(
    (state) => state.persist.isInsightJiraTicketHintShown
  );
  const isDrawerOpen = Boolean(insightIdToOpenSuggestion);

  const isJiraHintEnabled =
    !isInsightJiraTicketHintShown &&
    !isDrawerOpen &&
    !isDrawerTransitioning &&
    !isTransitioning;

  const { data, isLoading, refresh } = useInsightsData();

  const handleRefresh = () => {
    refresh();
  };

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

  // Set the insight view type in zustand store on component mount
  useEffect(() => {
    setInsightViewType("Issues");
  }, [setInsightViewType]);

  // Set the scope on query change
  useEffect(() => {
    dispatch(
      setScope({
        span: query?.scopedSpanCodeObjectId
          ? {
              spanCodeObjectId: query.scopedSpanCodeObjectId,
              displayName: "",
              methodId: null,
              serviceName: null,
              role: null
            }
          : null,
        code: {
          relatedCodeDetailsList: [],
          codeDetailsList: []
        },
        hasErrors: false,
        issuesInsightsCount: 0,
        analyticsInsightsCount: 0,
        unreadInsightsCount: 0,
        environmentId: query?.environment
      })
    );
  }, [query, dispatch]);

  return (
    <s.Container>
      <InsightsContent
        onScopeChange={onScopeChange}
        onGoToTab={onGoToTab}
        isLoading={isLoading}
        data={data ?? null}
        onRefresh={handleRefresh}
        onOpenSuggestion={handleOpenSuggestion}
        isJiraTicketHintEnabled={isJiraHintEnabled}
        onJiraTicketPopupOpen={handleJiraTicketPopupOpen}
        onJiraTicketPopupClose={handleJiraTicketPopupClose}
        infoToOpenJiraTicket={insightInfoToOpenTicket ?? undefined}
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
