import { Sorting } from "../Assets/AssetList/types";
import { AssetFilterQuery } from "../Assets/AssetsFilter/types";
import { ViewMode } from "../Assets/AssetsViewScopeConfiguration/types";

export interface GetHighlightsTopIssuesDataPayload {
  query: {
    scopedCodeObjectId: string | null;
    environments: string[];
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ErrorData {
  errorCode: string;
  description: string;
}

export interface LoginResult {
  error: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResult {
  errors?: ErrorData[];
  success: string;
}

export interface ViewData {
  id: string;
  path?: string;
}

export enum SCOPE_CHANGE_EVENTS {
  HISTORY_NAVIGATED = "HISTORY/NAVIGATED",
  HISTORY_CLEARED = "HISTORY/CLEARED",
  JAEGER_SPAN_LINK_CLICKED = "JAEGER/SPAN_LINK_CLICKED",
  DASHBOARD_CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED = "DASHBOARD/CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED",
  DASHBOARD_SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED = "DASHBOARD/SLOW_QUERIES_WIDGET_ITEM_LINK_CLICKED",
  NAVIGATION_CODE_BUTTON_MENU_ITEM_SELECTED = "NAVIGATION/CODE_BUTTON_MENU_ITEM_SELECTED",
  NAVIGATION_CODE_BUTTON_CLICKED = "NAVIGATION/CODE_BUTTON_CLICKED",
  NAVIGATION_HOME_BUTTON_CLICKED = "NAVIGATION/HOME_BUTTON_CLICKED",
  HIGHLIGHTS_TOP_ISSUES_CARD_ASSET_LINK_CLICKED = "HIGHLIGHTS/TOP_ISSUES_CARD_ASSET_LINK_CLICKED",
  HIGHLIGHTS_TOP_ISSUES_CARD_ITEM_CLICKED = "HIGHLIGHTS/TOP_ISSUES_CARD_ITEM_CLICKED",
  HIGHLIGHTS_PERFORMANCE_CARD_ITEM_CLICKED = "HIGHLIGHTS/PERFORMANCE_CARD_ITEM_CLICKED",
  HIGHLIGHTS_IMPACT_CARD_ITEM_CLICKED = "HIGHLIGHTS/IMPACT_CARD_ITEM_CLICKED",
  HIGHLIGHTS_SCALING_CARD_ITEM_CLICKED = "HIGHLIGHTS/SCALING_CARD_ITEM_CLICKED",
  INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED = "INSIGHTS/INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED",
  INSIGHTS_INSIGHT_CARD_ASSET_LINK_CLICKED = "INSIGHTS/INSIGHT_CARD_ASSET_LINK_CLICKED",
  ASSETS_ASSET_CARD_TITLE_LINK_CLICKED = "ASSETS/ASSET_CARD_TITLE_LINK_CLICKED",
  TESTS_TEST_CARD_TITLE_LINK_CLICKED = "TESTS/TEST_CARD_TITLE_LINK_CLICKED",
  NOTIFICATIONS_NOTIFICATION_CARD_ASSET_LINK_CLICKED = "NOTIFICATIONS/NOTIFICATION_CARD_ASSET_LINK_CLICKED",
  RECENT_ACTIVITY_SPAN_LINK_CLICKED = "RECENT_ACTIVITY_SPAN_LINK_CLICKED",
  IDE_CODE_LENS_CLICKED = "IDE/CODE_LENS_CLICKED",
  IDE_NOTIFICATION_LINK_CLICKED = "IDE/NOTIFICATION_LINK_CLICKED"
}

export interface ReactRouterLocationState {
  navigatedWithCustomHistory?: boolean;
}

export interface HistoryState extends ReactRouterLocationState {
  environmentId?: string;
  spanCodeObjectId?: string;
  spanDisplayName?: string;
  assets?: {
    page: number;
    search: string;
    sorting: Sorting;
    viewMode: ViewMode;
    filters: AssetFilterQuery;
  };
}
