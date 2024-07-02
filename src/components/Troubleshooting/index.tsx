import { useEffect } from "react";
import { useTheme } from "styled-components";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { openURLInDefaultBrowser } from "../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../common/App/styles";
import { CrossIcon } from "../common/icons/CrossIcon";
import { DockerLogoIcon } from "../common/icons/DockerLogoIcon";
import { GradleLogoIcon } from "../common/icons/GradleLogoIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { TerminalIcon } from "../common/icons/TerminalIcon";
import { actions } from "./actions";
import * as s from "./styles";
import { trackingEvents } from "./tracking";

const runOptions = [
  {
    key: "terminal",
    icon: TerminalIcon,
    label: "I Run it via Terminal"
  },
  {
    key: "docker",
    icon: DockerLogoIcon,
    label: "I Run it on Docker"
  },
  {
    key: "gradle-tasks",
    icon: GradleLogoIcon,
    label: "I Run it using Native Gradle Tasks"
  }
];

export const Troubleshooting = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });

    sendTrackingEvent(trackingEvents.PAGE_LOADED);
  }, []);

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.CLOSE_BUTTON_CLICKED);

    window.sendMessageToDigma({
      action: actions.CLOSE
    });
  };

  const handleRunOptionButtonClick = (key: string) => {
    sendUserActionTrackingEvent(trackingEvents.RUN_OPTION_BUTTON_CLICKED, {
      buttonId: key
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_DOCUMENTATION,
      payload: {
        page: `run-digma-with-${key}`
      }
    });
  };

  const handleSlackLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.SLACK_LINK_CLICKED);
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  return (
    <s.Container>
      <s.Header>
        Not seeing your application data?
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
      </s.Header>
      <s.Section>
        <s.SectionTitle>
          The easiest way to analyze your application data is to run or debug it
          using the IDE.
        </s.SectionTitle>
        <span>
          Be sure to enable observability via the the Digma side panel
        </span>
        <img src={`/images/observabilityToggleSwitch_${themeKind}.png`} />
      </s.Section>
      <s.Section>
        <s.SectionTitle>Running your app differently?</s.SectionTitle>
        <span>Here is how to analyze it using Digma</span>
        <s.RunOptionsButtonsContainer>
          {runOptions.map((option) => (
            <s.RunOptionButton
              key={option.key}
              onClick={() => handleRunOptionButtonClick(option.key)}
            >
              <s.IconContainer>
                <option.icon size={24} color={"currentColor"} />
              </s.IconContainer>
              {option.label}
            </s.RunOptionButton>
          ))}
        </s.RunOptionsButtonsContainer>
      </s.Section>
      <s.Section>
        <s.SectionTitle>Still unable to work with Digma?</s.SectionTitle>
        <span>We need your help to find out why!</span>
        <s.SlackLink onClick={handleSlackLinkClick}>
          <s.SlackLogoIconContainer>
            <SlackLogoIcon size={14} />
          </s.SlackLogoIconContainer>
          Report this issue and help us improve Digma
        </s.SlackLink>
      </s.Section>
    </s.Container>
  );
};
