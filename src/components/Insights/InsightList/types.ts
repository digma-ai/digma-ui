import { GenericCodeObjectInsight, MethodSpan } from "../types";

export interface InsightListProps {
  insights: GenericCodeObjectInsight[];
  spans: MethodSpan[];
  environment: string;
  serviceName?: string;
  assetId: string;
  hasObservability: boolean;
  hasMissingDependency: boolean;
  canInstrumentMethod: boolean;
}
