import { Environment } from "../../common/App/types";

export interface GetHighlightsSpanInfoDataPayload {
  query: {
    spanCodeObjectId: string | null;
  };
}

export interface SpanInfoData {
  displayName: string;
  services: string[];
  environments: Environment[];
  assetTypeId: string;
}

export interface ExpandButtonProps {
  $transitionClassName: string;
  $transitionDuration: number;
}

export interface AnimatedButtonContainerProps {
  $isExpanded: boolean;
}

export interface StyledCodeSnippetProps {
  $isExpanded: boolean;
}

export interface StatsContainerProps {
  $transitionClassName: string;
  $transitionDuration: number;
}
