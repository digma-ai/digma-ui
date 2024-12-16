import type { CodeDetails, Scope } from "../../../common/App/types";

export interface TargetButtonMenuProps {
  scope: Scope;
  onGoToCodeLocation: (codeDetails: CodeDetails) => void;
}
