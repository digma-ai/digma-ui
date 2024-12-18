import { SCOPE_CHANGE_EVENTS } from "../../types";
import type {
  Scope,
  ScopeWithCodeLensContext,
  ScopeWithCustomProtocolLinkContext,
  ScopeWithErrorDetailsId
} from "../common/App/types";

export const isScopeWithCodeLensContext = (
  x: Scope
): x is ScopeWithCodeLensContext =>
  x.context?.event === SCOPE_CHANGE_EVENTS.IDE_CODE_LENS_CLICKED;

export const isScopeWithRestApiCallContext = (
  x: Scope
): x is ScopeWithCustomProtocolLinkContext =>
  x.context?.event === SCOPE_CHANGE_EVENTS.IDE_REST_API_CALL;

export const isScopeWithErrorDetailsIdContext = (
  x: Scope
): x is ScopeWithErrorDetailsId =>
  x.context?.event === SCOPE_CHANGE_EVENTS.ERROR_CARD_LINK_CLICKED;
