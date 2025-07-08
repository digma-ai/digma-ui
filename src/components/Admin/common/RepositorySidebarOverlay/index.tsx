import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import History, {
  type HistoryEntry,
  type HistoryEntryLocation
} from "../../../../history/History";
import { usePrevious } from "../../../../hooks/usePrevious";
import {
  digmaApi,
  useGetSpanInfoQuery
} from "../../../../redux/services/digma";
import type {
  AssetType,
  GetIssuesPayload
} from "../../../../redux/services/types";
import {
  clear,
  setIssuesInsightIdToOpenSuggestion,
  setIssuesInsightInfoToOpenTicket
} from "../../../../redux/slices/repositorySlice";
import { useStore } from "../../../../store/useStore";
import { isString } from "../../../../typeGuards/isString";
import { ScopeChangeEvent } from "../../../../types";
import type { ChangeScopePayload } from "../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { addPrefix } from "../../../../utils/addPrefix";
import type { Scope } from "../../../common/App/types";
import { TAB_IDS } from "../../../Navigation/Tabs/types";
import { trackingEvents } from "../../tracking";
import { SidebarOverlay } from "../SidebarOverlay";
import { Analytics } from "./RepositorySidebar/Analytics";
import { Assets } from "./RepositorySidebar/Assets";
import { Errors } from "./RepositorySidebar/Errors";
import { Header } from "./RepositorySidebar/Header";
import { Issues } from "./RepositorySidebar/Issues";
import * as s from "./styles";
import type {
  RepositorySidebarHistoryState,
  RepositorySidebarOverlayProps,
  TabLocation
} from "./types";

const SIDEBAR_CLASSNAME = "issues-sidebar"; // For Product Fruits selector
const TRACKING_PREFIX = "repository";
const prefixedTrackingEvents = addPrefix(TRACKING_PREFIX, trackingEvents, " ");

const initialTabLocation: TabLocation = {
  id: TAB_IDS.ISSUES
};

export const RepositorySidebarOverlay = ({
  isSidebarOpen,
  onSidebarClose,
  sidebarQuery,
  scopeDisplayName,
  sidebarLocation
}: RepositorySidebarOverlayProps) => {
  const [isSidebarTransitioning, setIsSidebarTransitioning] = useState(false);
  const [currentTabLocation, setCurrentTabLocation] = useState<TabLocation>(
    sidebarLocation ?? initialTabLocation
  );
  const [currentSpanCodeObjectId, setCurrentSpanCodeObjectId] = useState(
    sidebarQuery?.query?.scopedSpanCodeObjectId
  );
  const insightInfoToOpenTicket = useAdminSelector(
    (state) => state.repository.issues.insightInfoToOpenTicket
  );
  const insightIdToOpenSuggestion = useAdminSelector(
    (state) => state.repository.issues.insightIdToOpenSuggestion
  );
  const { resetInsights, resetAssets, resetGlobalErrors } = useStore.getState();
  const dispatch = useAdminDispatch();
  const [history, setHistory] = useState(
    () => new History<RepositorySidebarHistoryState>([])
  );
  const previousIsSidebarOpen = usePrevious(isSidebarOpen);

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
      environmentId: sidebarQuery?.query?.environment,
      hasErrors: false,
      issuesInsightsCount: 0,
      analyticsInsightsCount: 0,
      unreadInsightsCount: 0
    }),
    [
      scopeBarDisplayName,
      currentSpanCodeObjectId,
      sidebarQuery?.query?.environment
    ]
  );

  useEffect(() => {
    const handleHistoryChangeOrNavigate = (
      e: CustomEvent<HistoryEntry<RepositorySidebarHistoryState>>
    ) => {
      setCurrentSpanCodeObjectId(e.detail.state?.spanCodeObjectId);
      setCurrentTabLocation(
        e.detail.state?.tabLocation ?? { id: TAB_IDS.ISSUES }
      );
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
    const newSpanCodeObjectId = sidebarQuery?.query?.scopedSpanCodeObjectId;
    setCurrentSpanCodeObjectId(newSpanCodeObjectId);
    history.clear();
    history.pushEntry(
      {
        pathname: window.location.pathname,
        search: window.location.search
      },
      {
        spanCodeObjectId: newSpanCodeObjectId,
        tabLocation: sidebarLocation ?? { id: TAB_IDS.ISSUES }
      }
    );
  }, [history, sidebarQuery?.query?.scopedSpanCodeObjectId, sidebarLocation]);

  const handleSidebarClose = useCallback(() => {
    dispatch(clear());
    resetInsights();
    resetAssets();
    resetGlobalErrors();
    setCurrentSpanCodeObjectId(undefined);
    setCurrentTabLocation(initialTabLocation);
    onSidebarClose();
  }, [dispatch, onSidebarClose, resetAssets, resetGlobalErrors, resetInsights]);

  // Reset history on sidebar open
  useEffect(() => {
    if (!previousIsSidebarOpen && isSidebarOpen) {
      setHistory(new History<RepositorySidebarHistoryState>([]));
    }
  }, [
    previousIsSidebarOpen,
    isSidebarOpen,
    currentSpanCodeObjectId,
    currentTabLocation
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sendUserActionTrackingEvent(
          prefixedTrackingEvents.SIDEBAR_ESCAPE_KEY_PRESSED
        );
        if (insightInfoToOpenTicket) {
          dispatch(setIssuesInsightInfoToOpenTicket(null));
        } else if (insightIdToOpenSuggestion) {
          dispatch(setIssuesInsightIdToOpenSuggestion(null));
        } else {
          handleSidebarClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    insightInfoToOpenTicket,
    insightIdToOpenSuggestion,
    handleSidebarClose,
    dispatch
  ]);

  const handleSidebarTransitionStart = () => {
    setIsSidebarTransitioning(true);
  };

  const handleSidebarTransitionEnd = () => {
    setIsSidebarTransitioning(false);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoForward = () => {
    history.goForward();
  };

  const updateHistory = ({
    payload,
    tabLocation
  }: {
    payload?: ChangeScopePayload;
    tabLocation?: TabLocation;
  }) => {
    const newEntry: HistoryEntryLocation = {
      pathname: window.location.pathname,
      search: window.location.search
    };

    const newState: RepositorySidebarHistoryState = {
      spanCodeObjectId: payload
        ? payload.span?.spanCodeObjectId
        : currentSpanCodeObjectId,
      tabLocation: tabLocation ?? currentTabLocation
    };

    if (
      !payload ||
      payload.span?.spanCodeObjectId === currentSpanCodeObjectId
    ) {
      history.replaceEntry(newEntry, newState);
    } else {
      history.pushEntry(newEntry, newState);
    }
  };

  const handleTabSelect = (tabId: string) => {
    updateHistory({ tabLocation: { id: tabId } });
  };

  const navigate = async (payload: ChangeScopePayload) => {
    if (!payload.context?.event) {
      updateHistory({ payload });
      return;
    }

    switch (payload.context?.event) {
      case ScopeChangeEvent.NavigationHomeButtonClicked:
        if (currentTabLocation.id === TAB_IDS.ASSETS) {
          updateHistory({ payload, tabLocation: { id: TAB_IDS.ASSETS } });
          break;
        }
        updateHistory({ payload, tabLocation: { id: TAB_IDS.ISSUES } });
        break;
      case ScopeChangeEvent.AssetsEmptyCategoryParentLinkClicked:
        updateHistory({ payload, tabLocation: { id: TAB_IDS.ANALYTICS } });
        break;
      case ScopeChangeEvent.ErrorCardLinkClicked: {
        const errorId = payload.context.payload?.id;

        if (!isString(errorId)) {
          break;
        }

        updateHistory({
          payload,
          tabLocation: { id: TAB_IDS.ERRORS, path: errorId }
        });
        break;
      }
      case ScopeChangeEvent.InsightsInsightCardTitleAssetLinkClicked:
      case ScopeChangeEvent.InsightsInsightCardAssetLinkClicked:
      default: {
        try {
          const result = await dispatch(
            digmaApi.endpoints.getInsightsStats.initiate({
              scopedSpanCodeObjectId: payload.span?.spanCodeObjectId,
              environment: sidebarQuery?.query?.environment,
              services:
                sidebarQuery?.query?.services &&
                sidebarQuery.query.services.length > 0
                  ? sidebarQuery.query.services.join(",")
                  : undefined
            })
          ).unwrap();

          if (result.data.issuesInsightsCount > 0) {
            updateHistory({ payload, tabLocation: { id: TAB_IDS.ISSUES } });
          } else {
            updateHistory({ payload, tabLocation: { id: TAB_IDS.ANALYTICS } });
          }
        } catch {
          updateHistory({ payload, tabLocation: { id: TAB_IDS.ISSUES } });
        }
      }
    }
  };

  const handleScopeChange = (payload: ChangeScopePayload) => {
    void navigate(payload);
  };

  const renderContent = () => {
    const handleSelectedAssetTypeIdChange = (assetTypeId?: AssetType) => {
      updateHistory({ tabLocation: { id: TAB_IDS.ASSETS, path: assetTypeId } });
    };

    const handleGoToTab = (tabId: string) => {
      updateHistory({ tabLocation: { id: tabId } });
    };

    const handleGoToAssets = () => {
      handleSelectedAssetTypeIdChange(undefined);
    };

    const handleSelectedErrorIdChange = (errorId?: string) => {
      updateHistory({
        tabLocation: { id: TAB_IDS.ERRORS, path: errorId }
      });
    };

    const currentQuery: GetIssuesPayload = {
      ...sidebarQuery?.query,
      scopedSpanCodeObjectId: currentSpanCodeObjectId
    };

    switch (currentTabLocation.id) {
      case TAB_IDS.ASSETS:
        return (
          <Assets
            query={currentQuery}
            onScopeChange={handleScopeChange}
            selectedAssetTypeId={
              currentTabLocation.path as AssetType | undefined
            }
            onSelectedAssetTypeIdChange={handleSelectedAssetTypeIdChange}
          />
        );
      case TAB_IDS.ANALYTICS:
        return (
          <Analytics
            onScopeChange={handleScopeChange}
            query={currentQuery}
            onGoToTab={handleGoToTab}
          />
        );
      case TAB_IDS.ERRORS:
        return (
          <Errors
            query={currentQuery}
            onScopeChange={handleScopeChange}
            onSelectedErrorIdChange={handleSelectedErrorIdChange}
            onGoToAssets={handleGoToAssets}
            selectedErrorId={currentTabLocation.path}
          />
        );
      case TAB_IDS.ISSUES:
      default:
        return (
          <Issues
            isTransitioning={isSidebarTransitioning}
            onScopeChange={handleScopeChange}
            query={currentQuery}
            onGoToTab={handleGoToTab}
          />
        );
    }
  };

  const sidebarProps = {
    className: SIDEBAR_CLASSNAME,
    isResizable: true,
    content: {
      header: (
        <Header
          scope={extendedScope}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onScopeChange={handleScopeChange}
          canGoBack={history.canGoBack()}
          canGoForward={history.canGoForward()}
          spanInfo={spanInfo}
          onTabSelect={handleTabSelect}
          selectedTabId={currentTabLocation.id}
          query={sidebarQuery?.query}
        />
      ),
      body: <s.TabContentContainer>{renderContent()}</s.TabContentContainer>
    }
  };

  return (
    <SidebarOverlay
      isSidebarOpen={isSidebarOpen}
      onSidebarClose={handleSidebarClose}
      onSidebarTransitionStart={handleSidebarTransitionStart}
      onSidebarTransitionEnd={handleSidebarTransitionEnd}
      sidebar={sidebarProps}
    />
  );
};
