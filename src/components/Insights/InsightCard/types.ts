import { ReactNode } from "react";
import { GenericCodeObjectInsight } from "../types";

export interface InsightCardProps {
  data: GenericCodeObjectInsight;
  content?: ReactNode;
  expandableContent?: ReactNode;
  menuItems?: string[];
  stats?: string;
  buttons?: ReactNode[];
  isExpandable?: boolean;
}
