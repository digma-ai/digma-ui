import { useTheme, type DefaultTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import { PulseIcon } from "../../../../common/icons/32px/PulseIcon";
import { CardsColoredIcon } from "../../../../common/icons/CardsColoredIcon";
import { EmptyState as CommonEmptyState } from "../../../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../../../common/v3/EmptyState/types";
import type { EmptyStatePreset, EmptyStateProps } from "./types";

const getPresetContent = (preset: EmptyStatePreset, theme: DefaultTheme) => {
  const themeKind = getThemeKind(theme);

  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    noFilteredData: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No data found",
      message: "There are no insights for this criteria"
    },
    noFilteredIssues: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No issues found",
      message: "Some issues are not be visible because of the active filters."
    },
    noSearchResults: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No results",
      message: "Check spelling or try to search something else."
    },
    noDismissedData: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No dismissed issues",
      message: "Click above to see all issues"
    },
    noInsightsYet: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No insights yet"
    },
    noSpanDataYet: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No data yet",
      message:
        "No data received yet for this span, please trigger some actions using this code to see more insights."
    },
    analyticsSelectAsset: {
      icon: <PulseIcon size={32} color={"currentColor"} />,
      title: "Select an asset to view data",
      message:
        "The Analytics tab shows\nperformance data for each Digma-\ntracked asset. See all tracked assets\non the Assets page."
    },
    noDataYet: {
      icon: <CardsColoredIcon size={33} themeKind={themeKind} />,
      title: "No data yet",
      message:
        "Trigger actions that call this application to learn more about its runtime behavior"
    }
  };

  return content[preset];
};

export const EmptyState = ({
  preset,
  icon,
  title,
  message,
  customContent
}: EmptyStateProps) => {
  const theme = useTheme();

  const props: EmptyStateProps = {
    ...(preset ? getPresetContent(preset, theme) : {}),
    ...(icon ? { icon } : {}),
    ...(title ? { title } : {}),
    ...(message ? { message } : {}),
    ...(customContent ? { customContent } : {})
  };

  return <CommonEmptyState {...props} />;
};
