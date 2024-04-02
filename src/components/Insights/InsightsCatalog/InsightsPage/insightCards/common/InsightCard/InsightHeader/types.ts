import { GenericCodeObjectInsight } from "../../../../../../types";

export interface InsightHeaderProps {
  insight: GenericCodeObjectInsight;
  isAsync?: boolean;
  onSpanLinkClick: (spanCodeObjectId: string) => void;
  lastUpdateTimer?: string | null;
}
