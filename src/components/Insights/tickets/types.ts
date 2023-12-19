import { GenericCodeObjectInsight, InsightTicketInfo } from "../types";

export interface CodeLocationsData {
  codeLocations: [];
}

export interface InsightTicketProps<T extends GenericCodeObjectInsight> {
  data: InsightTicketInfo<T>;
  onClose: () => void;
}
