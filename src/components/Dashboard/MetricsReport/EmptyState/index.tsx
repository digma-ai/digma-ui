import { CrossCircleIcon } from "../../../common/icons/20px/CrossCircleIcon";
import { CardsColoredIcon } from "../../../common/icons/CardsColoredIcon";
import { EmptyState as CommonEmptyState } from "../../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../../common/v3/EmptyState/types";
import { NewButton } from "../../../common/v3/NewButton";
import * as s from "./styles";
import type { EmptyStatePreset, EmptyStateProps } from "./types";

const getPresetContent = (preset: EmptyStatePreset) => {
  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    noData: {
      title: "No available data",
      message:
        "Make sure you have at least one active environment to fetch data from",
      icon: <CrossCircleIcon size={32} color={"currentColor"} />,
      customContent: (
        <NewButton
          buttonType={"secondary"}
          label={"Refresh"}
          onClick={handleRefreshButtonClick}
        />
      )
    },
    noServices: {
      title: "No Results",
      message: "No services recorded for this environment",
      icon: <CardsColoredIcon size={33} />
    },
    noEndpoints: {
      title: "No Results",
      message: "No entry points recorded for this environment",
      icon: <CardsColoredIcon size={33} />
    },
    loading: {
      title: "Fetching results",
      message: "Updating the results list may take a few moments",
      icon: <s.Spinner size={32} />
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
