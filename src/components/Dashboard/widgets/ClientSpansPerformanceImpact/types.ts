import { ListWidgetData } from "../../ListWidget/types";

export interface ClientSpanOverallImpactEntry {
  spanCodeObjectId: string;
  displayName: string;
  overallImpact: number;
}

export interface ClientSpansPerformanceImpactProps {
  data?: ListWidgetData<ClientSpanOverallImpactEntry>;
  environment: string;
}
