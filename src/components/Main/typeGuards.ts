import { ScopeChangeEvent } from "../../types";
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
  x.context?.event === ScopeChangeEvent.IdeCodeLensClicked;

export const isScopeWithRestApiCallContext = (
  x: Scope
): x is ScopeWithCustomProtocolLinkContext =>
  x.context?.event === ScopeChangeEvent.IdeRestApiCall;

export const isScopeWithErrorDetailsIdContext = (
  x: Scope
): x is ScopeWithErrorDetailsId =>
  x.context?.event === ScopeChangeEvent.ErrorCardLinkClicked;

export const isScopeWithMetricsReportContext = (
  x: Scope
): x is ScopeWithMetricsReportContext =>
  Boolean(
    x.context?.event &&
      [
        ScopeChangeEvent.MetricsServiceSelected,
        ScopeChangeEvent.MetricsEndpointSelected
      ].includes(x.context?.event)
  );
