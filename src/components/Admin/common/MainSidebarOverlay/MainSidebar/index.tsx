import { useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../containers/Admin/hooks";
import History, { type HistoryEntry } from "../../../../../history/History";
import {
  digmaApi,
  useGetSpanInfoQuery
} from "../../../../../redux/services/digma";
import type { GetIssuesPayload } from "../../../../../redux/services/types";
import {
  setIssuesInsightIdToOpenSuggestion,
  setIssuesInsightInfoToOpenTicket
} from "../../../../../redux/slices/repositorySlice";
import { ScopeChangeEvent } from "../../../../../types";
import type { ChangeScopePayload } from "../../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import type { Scope } from "../../../../common/App/types";
import { TwoVerticalLinesIcon } from "../../../../common/icons/16px/TwoVerticalLinesIcon";
import { TAB_IDS } from "../../../../Navigation/Tabs/types";
import { trackingEvents } from "../../../tracking";
import { Analytics } from "./Analytics";
import { Assets } from "./Assets";
import { Header } from "./Header";
import { Issues } from "./Issues";
import * as s from "./styles";
import type { MainSidebarHistoryState, MainSidebarProps } from "./types";

const CONTAINER_ID = "issues-sidebar"; // For Product Fruits selector

export const MainSidebar = ({
  onClose,
  isTransitioning,
  isResizing,
  onResizeHandleMouseDown,
  query,
  scopeDisplayName
}: MainSidebarProps) => {
  const [currentTabId, setCurrentTabId] = useState<string>(TAB_IDS.ISSUES);
  const [currentSpanCodeObjectId, setCurrentSpanCodeObjectId] = useState(
    query?.scopedSpanCodeObjectId
  );
  const insightInfoToOpenTicket = useAdminSelector(
    (state) => state.repositorySlice.issues.insightInfoToOpenTicket
  );
  const insightIdToOpenSuggestion = useAdminSelector(
    (state) => state.repositorySlice.issues.insightIdToOpenSuggestion
  );
  const dispatch = useAdminDispatch();
  const [history] = useState(
    () =>
      new History<MainSidebarHistoryState>([
        {
          location: window.location,
          state: {
            spanCodeObjectId: currentSpanCodeObjectId,
            tabId: currentTabId
          }
        }
      ])
  );

  const { data: spanInfo } = useGetSpanInfoQuery(
    { spanCodeObjectId: currentSpanCodeObjectId ?? "" },
    {
      skip: !currentSpanCodeObjectId
    }
  );

  const scopeBarDisplayName = currentSpanCodeObjectId
    ? spanInfo?.displayName
    : scopeDisplayName ?? "Home";

  const extendedScope: Scope = useMemo(
    () => ({
      span: {
        displayName: scopeBarDisplayName ?? currentSpanCodeObjectId ?? "",
        spanCodeObjectId: currentSpanCodeObjectId ?? "",
        methodId: null,
        serviceName: null,
        role: null
      },
      code: {
        relatedCodeDetailsList: [],
        codeDetailsList: []
      },
      environmentId: query?.environment,
      hasErrors: false,
      issuesInsightsCount: 0,
      analyticsInsightsCount: 0,
      unreadInsightsCount: 0
    }),
    [scopeBarDisplayName, currentSpanCodeObjectId, query?.environment]
  );

  useEffect(() => {
    const handleHistoryChangeOrNavigate = (
      e: CustomEvent<HistoryEntry<MainSidebarHistoryState>>
    ) => {
      setCurrentSpanCodeObjectId(e.detail.state?.spanCodeObjectId);
      setCurrentTabId(e.detail.state?.tabId ?? TAB_IDS.ISSUES);
    };

    window.addEventListener(
      "history:change",
      handleHistoryChangeOrNavigate as EventListener
    );
    window.addEventListener(
      "history:navigate",
      handleHistoryChangeOrNavigate as EventListener
    );

    return () => {
      window.removeEventListener(
        "history:change",
        handleHistoryChangeOrNavigate as EventListener
      );
      window.removeEventListener(
        "history:navigate",
        handleHistoryChangeOrNavigate as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const newSpanCodeObjectId = query?.scopedSpanCodeObjectId;
    setCurrentSpanCodeObjectId(newSpanCodeObjectId);
    history.clear();
    history.pushEntry(
      {
        pathname: window.location.pathname,
        search: window.location.search
      },
      {
        spanCodeObjectId: newSpanCodeObjectId,
        tabId: TAB_IDS.ISSUES
      }
    );
  }, [history, query?.scopedSpanCodeObjectId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sendUserActionTrackingEvent(
          trackingEvents.MAIN_SIDEBAR_ESCAPE_KEY_PRESSED
        );
        if (insightInfoToOpenTicket) {
          dispatch(setIssuesInsightInfoToOpenTicket(null));
        } else if (insightIdToOpenSuggestion) {
          dispatch(setIssuesInsightIdToOpenSuggestion(null));
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [insightInfoToOpenTicket, insightIdToOpenSuggestion, onClose, dispatch]);

  const handleSidebarCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.MAIN_SIDEBAR_CLOSE_BUTTON_CLICKED
    );
    onClose();
  };

  const handleSidebarResizeHandleMouseDown = (e: MouseEvent) => {
    sendUserActionTrackingEvent(
      trackingEvents.MAIN_SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_PRESSED
    );
    onResizeHandleMouseDown(e);
  };

  const handleGoBack = () => {
    sendUserActionTrackingEvent(
      trackingEvents.MAIN_SIDEBAR_BACK_BUTTON_CLICKED
    );
    history.goBack();
  };

  const handleGoForward = () => {
    sendUserActionTrackingEvent(
      trackingEvents.MAIN_SIDEBAR_FORWARD_BUTTON_CLICKED
    );
    history.goForward();
  };

  const handleGoHome = () => {
    sendUserActionTrackingEvent(
      trackingEvents.MAIN_SIDEBAR_HOME_BUTTON_CLICKED
    );

    if (!currentSpanCodeObjectId) {
      return;
    }

    history.pushEntry(
      {
        pathname: window.location.pathname,
        search: window.location.search
      },
      {
        spanCodeObjectId: undefined,
        tabId: currentTabId
      }
    );
  };

  const handleTabSelect = (tabId: string) => {
    const newEntry = {
      pathname: window.location.pathname,
      search: window.location.search
    };
    const newState = {
      spanCodeObjectId: currentSpanCodeObjectId,
      tabId
    };

    history.replaceEntry(newEntry, newState);
  };

  const updateHistory = (payload: ChangeScopePayload, tabId: string) => {
    const newEntry = {
      pathname: window.location.pathname,
      search: window.location.search
    };

    const newState = {
      spanCodeObjectId: payload.span?.spanCodeObjectId,
      tabId
    };

    if (payload.span?.spanCodeObjectId === currentSpanCodeObjectId) {
      history.replaceEntry(newEntry, newState);
    } else {
      history.pushEntry(newEntry, newState);
    }
  };

  const navigate = async (payload: ChangeScopePayload) => {
    switch (payload.context?.event) {
      case ScopeChangeEvent.NavigationHomeButtonClicked:
        if (currentTabId === TAB_IDS.ASSETS) {
          updateHistory(payload, TAB_IDS.ASSETS);
          break;
        }
        updateHistory(payload, TAB_IDS.ISSUES);
        break;
      case ScopeChangeEvent.AssetsEmptyCategoryParentLinkClicked:
        updateHistory(payload, TAB_IDS.ANALYTICS);
        break;
      case ScopeChangeEvent.InsightsInsightCardTitleAssetLinkClicked:
      case ScopeChangeEvent.InsightsInsightCardAssetLinkClicked:
      default: {
        const result = await dispatch(
          digmaApi.endpoints.getInsightsStats.initiate({
            scopedSpanCodeObjectId: payload.span?.spanCodeObjectId,
            environment: query?.environment,
            services:
              query?.services && query?.services.length > 0
                ? query?.services.join(",")
                : undefined
          })
        ).unwrap();

        if (result.data.issuesInsightsCount > 0) {
          updateHistory(payload, TAB_IDS.ISSUES);
        } else {
          updateHistory(payload, TAB_IDS.ANALYTICS);
        }
      }
    }
  };

  const renderContent = () => {
    const handleScopeChange = (payload: ChangeScopePayload) => {
      void navigate(payload);
    };

    const handleGoToAssets = () => {
      handleTabSelect(TAB_IDS.ASSETS);
    };

    const currentQuery: GetIssuesPayload = {
      ...query,
      scopedSpanCodeObjectId: currentSpanCodeObjectId
    };

    switch (currentTabId) {
      case TAB_IDS.ASSETS:
        return (
          <Assets query={currentQuery} onScopeChange={handleScopeChange} />
        );
      case TAB_IDS.ANALYTICS:
        return (
          <Analytics
            onScopeChange={handleScopeChange}
            query={currentQuery}
            onGoToAssets={handleGoToAssets}
          />
        );
      case TAB_IDS.ISSUES:
      default:
        return (
          <Issues
            isTransitioning={isTransitioning}
            onScopeChange={handleScopeChange}
            query={currentQuery}
          />
        );
    }
  };

  return (
    <s.Container $isResizing={isResizing} className={CONTAINER_ID}>
      <Header
        onCloseButtonClick={handleSidebarCloseButtonClick}
        scope={extendedScope}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onGoHome={handleGoHome}
        canGoBack={history.canGoBack()}
        canGoForward={history.canGoForward()}
        spanInfo={spanInfo}
        onTabSelect={handleTabSelect}
        selectedTabId={currentTabId}
        query={query}
      />
      <s.ContentContainer>
        <s.ResizeHandle onMouseDown={handleSidebarResizeHandleMouseDown}>
          <TwoVerticalLinesIcon size={16} color={"currentColor"} />
        </s.ResizeHandle>
        <s.TabContentContainer>{renderContent()}</s.TabContentContainer>
      </s.ContentContainer>
    </s.Container>
  );
};
