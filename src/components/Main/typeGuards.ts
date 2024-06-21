import { Scope, ScopeWithCodeLensContext } from "../common/App/types";
import { SCOPE_CHANGE_EVENTS } from "./types";

export const isScopeWithCodeLensContext = (
  x: Scope
): x is ScopeWithCodeLensContext =>
  x.context?.event === SCOPE_CHANGE_EVENTS.IDE_CODE_LENS_CLICKED;
