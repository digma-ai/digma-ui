import type { ComponentType } from "react";
import type { Environment, EnvironmentType } from "../../redux/services/types";
import type { InsightType } from "../../types";
import type { IconProps } from "../common/icons/types";
import type { AddToRunConfigState } from "./EnvironmentInstructionsPanel/types";
import type { ViewMode } from "./EnvironmentPanel/types";

export interface RecentActivityThemeColors {
  background: string;
  header: {
    text: string;
  };
  table: {
    header: {
      text: string;
    };
    row: {
      default: {
        border: string;
        background: string;
        link: string;
      };
      new: {
        border: string;
        background: string;
        link: string;
      };
    };
  };
}

export interface ViewModeOption {
  value: ViewMode;
  icon: ComponentType<IconProps>;
}

export interface ActivityEnvironment extends Environment {
  /** @deprecated */
  additionToConfigResult: AddToRunConfigState | null;
  /** @deprecated */
  token?: string | null;
  /** @deprecated */
  serverApiUrl: string | null;
  /** @deprecated */
  isOrgDigmaSetupFinished: boolean;
}

export interface ExtendedEnvironment extends ActivityEnvironment {
  hasRecentActivity: boolean;
}

export interface SetIsJaegerData {
  isJaegerEnabled: boolean;
}

export interface ViewModeOptionProps {
  $selected: boolean;
}

export interface DigmathonProgressInsightData {
  type: InsightType;
  foundAt: string;
}

export interface SetDigmathonProgressDataPayload {
  insights: DigmathonProgressInsightData[];
  lastUpdatedByUserAt: string | null;
}

export interface DigmathonInsightCardData {
  title: string;
  description: string;
  illustration: JSX.Element;
}

export interface DigmathonInsightData {
  type: InsightType;
  data: DigmathonInsightCardData | undefined;
  foundAt: string | null;
}

export interface DigmathonProgressData {
  insights: DigmathonInsightData[];
  lastUpdatedByUserAt: string | null;
}

export interface CreateEnvironmentPayload {
  environment: string;
  type: EnvironmentType | null;
}

export interface ErrorResponseData {
  errorCode: string;
  errorDescription: string;
}

export interface EnvironmentCreatedData {
  errors?: ErrorResponseData[];
  id: string;
}

export interface EnvironmentInstructionsVisibility {
  isOpen: boolean;
  newlyCreatedEnvironmentId?: string;
  keepOpen: boolean;
}

export type EnvironmentClearDataTimeStamps = Record<string, string>;
