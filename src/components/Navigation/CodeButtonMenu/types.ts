import { CodeContext } from "../types";

export interface CodeButtonMenuProps {
  codeContext: CodeContext;
  isAnnotationAdding: boolean;
  isAutofixing: boolean;
  onAutofix: (methodId: string) => void;
  onObservabilityAdd: (methodId: string) => void;
  onScopeChange: (spanCodeObjectId: string, serviceName: string | null) => void;
}
