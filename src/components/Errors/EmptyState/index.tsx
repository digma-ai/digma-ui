import { ErrorIcon } from "../../common/icons/16px/ErrorIcon";
import { CheckCircleIcon } from "../../common/icons/38px/CheckCircleIcon";
import { CardsColoredIcon } from "../../common/icons/CardsColoredIcon";
import { EmptyState as CommonEmptyState } from "../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";
import * as s from "./styles";
import type { EmptyStatePreset, EmptyStateProps } from "./types";

const getPresetContent = (preset: EmptyStatePreset) => {
  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    noData: {
      icon: <CheckCircleIcon size={32} color={"currentColor"} />,
      title: "Good News!\nNo Errors Recorded Yet",
      message:
        "You should return to this page if any exceptions do occur to see more details."
    },
    noSearchResults: {
      icon: <CardsColoredIcon size={33} />,
      title: "No results",
      message: "Check spelling or try to search something else."
    },
    noFilteredData: {
      icon: <CardsColoredIcon size={33} />,
      title: "No errors",
      message:
        "No data is available for the selected filters. Try resetting your filters."
    },
    noDismissedData: {
      icon: <CheckCircleIcon size={32} color={"currentColor"} />,
      title: "No dismissed errors available",
      message: "Click above to see all errors"
    },
    selectAsset: {
      icon: <ErrorIcon size={32} color={"currentColor"} />,
      title: "Select an asset to view errors",
      message:
        "The Errors tab shows details for\nexceptions for each Digma-tracked\nasset. See all tracked assets on the\nAssets page."
    },
    loading: {
      icon: <s.Spinner size={32} />,
      title: "Fetching data"
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
  const props: EmptyStateProps = {
    ...(preset ? getPresetContent(preset) : {}),
    ...(icon ? { icon } : {}),
    ...(title ? { title } : {}),
    ...(message ? { message } : {}),
    ...(customContent ? { customContent } : {})
  };

  return <CommonEmptyState {...props} />;
};
