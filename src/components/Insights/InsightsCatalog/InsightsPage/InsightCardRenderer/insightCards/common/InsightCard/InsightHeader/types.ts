import type { GenericCodeObjectInsight } from "../../../../../../../types";

export interface InsightHeaderProps {
  insight: GenericCodeObjectInsight;
  isAsync?: boolean;
  onSpanLinkClick: () => void;
  lastUpdateTimer?: string | null;
}
