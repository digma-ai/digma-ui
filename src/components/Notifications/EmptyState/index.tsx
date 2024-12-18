import { CrossedBellIcon } from "../../common/icons/CrossedBellIcon";
import * as s from "./styles";
import type { EmptyStateProps } from "./types";

import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { EmptyState as CommonEmptyState } from "../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";
import type { EmptyStatePreset } from "./types";

const getPresetContent = (preset: EmptyStatePreset) => {
  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    noData: {
      icon: <CrossedBellIcon size={32} color={"currentColor"} />,
      title: "No Notifications"
    },
    noUnreadData: {
      icon: <CrossedBellIcon size={32} color={"currentColor"} />,
      title: "No Unread Notifications"
    },
    loading: {
      icon: <s.Spinner size={32} />,
      title: "Fetching data"
    },
    error: {
      icon: <CrossedBellIcon size={32} color={"currentColor"} />,
      title: "Unable To Get Notifications",
      customContent: (
        <s.SlackLink onClick={handleSlackLinkClick}>
          <SlackLogoIcon size={14} />
          Having trouble? Please reach out in our Slack group
        </s.SlackLink>
      )
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
