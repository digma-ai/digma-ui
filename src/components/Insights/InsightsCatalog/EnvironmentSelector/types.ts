import type {
  Environment,
  EnvironmentIssueCounts
} from "../../../../redux/services/types";
import type { ChangeScopePayload } from "../../../../utils/actions/changeScope";

export interface SelectorEnvironment {
  environment: Environment;
  issueCounts?: EnvironmentIssueCounts;
}

export interface EnvironmentSelectorProps {
  environments: SelectorEnvironment[];
  onScopeChange: (payload: ChangeScopePayload) => void;
}
