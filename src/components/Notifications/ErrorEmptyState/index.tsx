import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { EmptyState } from "../EmptyState";
import * as s from "./styles";

export const ErrorEmptyState = () => {
  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  return (
    <EmptyState
      title={"Unable to get notifications"}
      content={
        <s.SlackLink onClick={handleSlackLinkClick}>
          <SlackLogoIcon size={14} />
          Having trouble? Please reach out in our Slack group
        </s.SlackLink>
      }
    />
  );
};
