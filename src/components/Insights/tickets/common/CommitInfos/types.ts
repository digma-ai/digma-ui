import { GenericCodeObjectInsight } from "../../../types";
import { CommitInfosData } from "../../types";

export interface CommitInfosProps {
  insight: GenericCodeObjectInsight | undefined | null;
  commitInfos?: CommitInfosData | null;
}
