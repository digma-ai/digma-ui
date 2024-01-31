import { GenericCodeObjectInsight } from "../../../types";
import { CommitInfosData } from "../../types";

export interface CommitInfosProps {
  insight: GenericCodeObjectInsight | null;
  commitInfos?: CommitInfosData | null;
}
