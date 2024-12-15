import type { GenericCodeObjectInsight } from "../../../types";
import type { CommitInfosData } from "../../types";

export interface CommitInfosProps {
  insight: GenericCodeObjectInsight | null;
  commitInfos?: CommitInfosData | null;
}
