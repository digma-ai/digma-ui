import { InsightGroup } from "../types";

export interface InsightListProps {
  insightGroups: InsightGroup[];
  environment: string;
  serviceName?: string;
  assetId: string;
}
