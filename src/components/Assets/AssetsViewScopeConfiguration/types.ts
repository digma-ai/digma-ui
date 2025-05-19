import type { ScopeSpanRole } from "../../common/App/types";

export interface AssetsViewScopeConfigurationProps {
  assetsCount?: number;
  spanRole?: ScopeSpanRole;
}

export type ViewMode = "descendants" | "children";
