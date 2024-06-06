import { FilesURIsMap, Frame } from "../../../types";

export interface FrameItemCodeLocation {
  URI: string;
  lineNumber: number;
}

export interface SpanFrameGroupProps {
  spanName: string;
  frames: Frame[];
  filesURIs: FilesURIsMap;
  onGoCodeLocation: (location: FrameItemCodeLocation) => void;
}
