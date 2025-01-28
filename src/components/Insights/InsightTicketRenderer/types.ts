import type { GetAboutResponse } from "../../../redux/services/types";
import type { BackendInfo } from "../../common/App/types";
import type { GenericCodeObjectInsight, InsightTicketInfo } from "../types";

export interface InsightTicketRendererProps {
  data: InsightTicketInfo<GenericCodeObjectInsight>;
  refreshInsights: () => void;
  onClose: () => void;
  backendInfo: BackendInfo | GetAboutResponse | null;
}
