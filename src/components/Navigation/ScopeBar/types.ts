import { Scope } from "../../common/App/types";
import { CodeContext } from "../types";

export interface ScopeBarProps {
  codeContext?: CodeContext;
  scope: Scope | null;
}
