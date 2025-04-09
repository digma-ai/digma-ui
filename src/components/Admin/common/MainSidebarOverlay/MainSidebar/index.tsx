import { useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../../containers/Admin/hooks";
import History, {
  type HistoryEntry,
  type HistoryEntryLocation
} from "../../../../../history/History";
import {
  digmaApi,
  useGetSpanInfoQuery
} from "../../../../../redux/services/digma";
import type {
  AssetType,
  GetIssuesPayload
} from "../../../../../redux/services/types";
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
import type {
  MainSidebarHistoryState,
  MainSidebarProps,
  TabLocation
} from "./types";

const CONTAINER_ID = "issues-sidebar"; // For Product Fruits selector

export const MainSidebar = ({
  onClose,
  isTransitioning,
  isResizing,
  onResizeHandleMouseDown,
  query,
  scopeDisplayName
}: MainSidebarProps) => {
  const [currentTabLocation, setCurrentTabLocation] = useState<TabLocation>({
    id: TAB_IDS.ISSUES
  });
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
            tabLocation: currentTabLocation
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
        tabLocation: { id: TAB_IDS.ISSUES }
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

    const newState: MainSidebarHistoryState = {
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
      case ScopeChangeEvent.InsightsInsightCardTitleAssetLinkClicked:
      case ScopeChangeEvent.InsightsInsightCardAssetLinkClicked:
      default: {
        try {
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

    const handleGoToAssets = () => {
      handleSelectedAssetTypeIdChange(undefined);
    };

    const currentQuery: GetIssuesPayload = {
      ...query,
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
        onScopeChange={handleScopeChange}
        canGoBack={history.canGoBack()}
        canGoForward={history.canGoForward()}
        spanInfo={spanInfo}
        onTabSelect={handleTabSelect}
        selectedTabId={currentTabLocation.id}
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
