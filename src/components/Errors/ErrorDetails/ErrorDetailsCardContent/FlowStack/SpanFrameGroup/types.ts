import type { ErrorFlowFrame } from "../../../../../../redux/services/types";
import type { FilesURIsMap } from "../../../types";

export interface FrameItemCodeLocation {
  URI: string;
  lineNumber: number;
}

export interface SpanFrameGroupProps {
  spanName: string;
  frames: ErrorFlowFrame[];
  filesURIs: FilesURIsMap;
  onGoCodeLocation: (location: FrameItemCodeLocation) => void;
}
