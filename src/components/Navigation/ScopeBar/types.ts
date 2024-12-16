import type { Scope } from "../../common/App/types";
import type { LinkedEndpoint } from "../SpanInfo/types";
import type { CodeContext } from "../types";

export interface ScopeBarProps {
  codeContext?: CodeContext;
  scope: Scope | null;
  isExpanded: boolean;
  onExpandCollapseChange: (isExpanded: boolean) => void;
  isSpanInfoEnabled: boolean;
  linkedEndpoints: LinkedEndpoint[];
}
