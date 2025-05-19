import type {
  AssetRecordItemRead,
  AssetsSortingCriterion,
  GetAboutResponse
} from "../../../../redux/services/types";
import type { BackendInfo } from "../../../common/App/types";

export interface AssetEntryProps {
  entry: AssetRecordItemRead;
  onAssetLinkClick: (entry: AssetRecordItemRead) => void;
  sortingCriterion: AssetsSortingCriterion;
  isImpactHidden: boolean;
  backendInfo?: BackendInfo | GetAboutResponse | null;
}

export interface InsightIconContainerProps {
  $criticality: number;
}
