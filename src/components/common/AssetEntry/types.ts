import { Duration } from "../../../globals";
import { Insight } from "../../Assets/types";

export interface AssetEntryProps {
  name: string;
  services: string[];
  performance?: Duration;
  lastSeenDateTime: string;
  insights: Insight[];
  onAssetLinkClick: () => void;
}
