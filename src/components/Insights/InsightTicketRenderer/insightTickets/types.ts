import type { GenericCodeObjectInsight, InsightTicketInfo } from "../../types";

export interface CodeLocationsData {
  codeLocations: string[];
}

export interface InsightTicketProps<T extends GenericCodeObjectInsight> {
  data: InsightTicketInfo<T>;
  refreshInsights: () => void;
  onClose: () => void;
  environmentId?: string;
}

export interface CommitInfosData {
  commitInfos: Record<string, { commit: string; url: string }>;
}
