import { GenericCodeObjectInsight } from "../../../types";
import { CommitInfosData } from "../../types";

export interface CommitInfosProps {
  insight: GenericCodeObjectInsight | undefined;
  commitInfos?: CommitInfosData | null;
}
