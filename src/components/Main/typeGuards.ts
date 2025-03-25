import { SCOPE_CHANGE_EVENTS } from "../../types";
import type {
  Scope,
  ScopeWithCodeLensContext,
  ScopeWithCustomProtocolLinkContext,
  ScopeWithErrorDetailsId,
  ScopeWithMetricsReportContext
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

export const isScopeWithMetricsReportContext = (
  x: Scope
): x is ScopeWithMetricsReportContext =>
  Boolean(
    x.context?.event &&
      [
        SCOPE_CHANGE_EVENTS.METRICS_SERVICE_SELECTED,
        SCOPE_CHANGE_EVENTS.METRICS_ENDPOINT_SELECTED
      ].includes(x.context?.event as SCOPE_CHANGE_EVENTS)
  );
