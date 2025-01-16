import type { GenericCodeObjectInsight, InsightTicketInfo } from "../types";

export interface InsightTicketRendererProps {
  data: InsightTicketInfo<GenericCodeObjectInsight>;
  refreshInsights: () => void;
  onClose: () => void;
  environmentId?: string;
}
