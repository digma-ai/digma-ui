import { GenericCodeObjectInsight, InsightTicketInfo } from "../types";

export interface CodeLocationsData {
  codeLocations: string[];
}

export interface InsightTicketProps<T extends GenericCodeObjectInsight> {
  data: InsightTicketInfo<T>;
  onClose: () => void;
}

export type CommitInfosData = {
  commitInfos: Record<string, { commit: string; url: string }>;
};
