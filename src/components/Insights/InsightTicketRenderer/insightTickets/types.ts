import type { GetAboutResponse } from "../../../../redux/services/types";
import type { BackendInfo } from "../../../common/App/types";
import type { GenericCodeObjectInsight, InsightTicketInfo } from "../../types";

export interface CodeLocationsData {
  codeLocations: string[];
}

export interface InsightTicketProps<T extends GenericCodeObjectInsight> {
  data: InsightTicketInfo<T>;
  refreshInsights: () => void;
  onClose: () => void;
  backendInfo: BackendInfo | GetAboutResponse | null;
}

export interface CommitInfosData {
  commitInfos: Record<string, { commit: string; url: string }>;
}
