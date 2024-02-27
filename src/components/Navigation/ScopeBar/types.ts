import { Scope } from "../../common/App/types";
import { CodeContext } from "../types";

export interface ScopeBarProps {
  codeContext?: CodeContext;
  scope?: Scope;
}

export interface ScopeBarElementProps {
  $isActive?: boolean;
}
