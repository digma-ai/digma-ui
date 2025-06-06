import type { CodeContext } from "../types";

export interface CodeButtonMenuProps {
  codeContext: CodeContext;
  isAnnotationAdding: boolean;
  isAutoFixing: boolean;
  onAutoFix: (methodId: string) => void;
  onObservabilityAdd: (methodId: string) => void;
  onScopeChange: (spanCodeObjectId: string) => void;
  onClose: () => void;
}

export interface LinkProps {
  $isDisabled?: boolean;
}
