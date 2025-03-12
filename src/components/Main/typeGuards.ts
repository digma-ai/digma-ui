import { ScopeChangeEvent } from "../../types";
import type {
  Scope,
  ScopeWithCodeLensContext,
  ScopeWithCustomProtocolLinkContext,
  ScopeWithErrorDetailsId
} from "../common/App/types";

export const isScopeWithCodeLensContext = (
  x: Scope
): x is ScopeWithCodeLensContext =>
  x.context?.event === ScopeChangeEvent.IdeCodeLensClicked;

export const isScopeWithRestApiCallContext = (
  x: Scope
): x is ScopeWithCustomProtocolLinkContext =>
  x.context?.event === ScopeChangeEvent.IdeRestApiCall;

export const isScopeWithErrorDetailsIdContext = (
  x: Scope
): x is ScopeWithErrorDetailsId =>
  x.context?.event === ScopeChangeEvent.ErrorCardLinkClicked;
