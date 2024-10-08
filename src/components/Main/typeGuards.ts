import { SCOPE_CHANGE_EVENTS } from "../../types";
import {
  Scope,
  ScopeWithCodeLensContext,
  ScopeWithCustomProtocolLinkContext
} from "../common/App/types";

export const isScopeWithCodeLensContext = (
  x: Scope
): x is ScopeWithCodeLensContext =>
  x.context?.event === SCOPE_CHANGE_EVENTS.IDE_CODE_LENS_CLICKED;

export const isScopeWithCustomProtocolLinkContext = (
  x: Scope
): x is ScopeWithCustomProtocolLinkContext =>
  x.context?.event === SCOPE_CHANGE_EVENTS.IDE_CUSTOM_PROTOCOL_LINK_CLICKED;
