import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { EmptyState as CommonEmptyState } from "../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";
import * as s from "./styles";
import type { EmptyStatePreset, EmptyStateProps } from "./types";

const getPresetContent = (preset: EmptyStatePreset) => {
  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    noData: {
      title: "Run tests with Digma",
      message:
        "Run your test with Digma enabled to see related tests and insights"
    },
    noFilteredData: {
      title: "No results",
      message:
        "It seems there are no tests matching your selected filters at the moment"
    },
    selectAsset: {
      icon: <RefreshIcon size={32} color={"currentColor"} />,
      title: "Select an asset to run tests",
      message:
        "The Tests tab shows details for\ntests for each Digma-tracked\nasset. See all tracked assets on the\nAssets page."
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
