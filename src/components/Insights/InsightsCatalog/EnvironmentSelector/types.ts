import { Environment, EnvironmentIssueCounts } from "../../../common/App/types";

export interface SelectorEnvironment {
  environment: Environment;
  issueCounts?: EnvironmentIssueCounts;
}

export interface EnvironmentSelectorProps {
  environments: SelectorEnvironment[];
}

export type ScrollDirection = "left" | "right";

export interface CarouselButtonProps {
  direction: ScrollDirection;
}
