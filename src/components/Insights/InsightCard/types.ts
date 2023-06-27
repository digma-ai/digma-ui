import { ReactNode } from "react";
import { Insight } from "../../Assets/types";

export interface InsightCardProps {
  data: Insight;
  content?: ReactNode;
  expandableContent?: ReactNode;
  menuItems?: string[];
  stats?: string;
  buttons?: ReactNode[];
  isExpandable?: boolean;
}
