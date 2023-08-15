import { useEffect } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { actions as globalActions } from "../../actions";
import { SLACK_WORKSPACE_URL } from "../../constants";
import { addPrefix } from "../../utils/addPrefix";
import { openURLInDefaultBrowser } from "../../utils/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../utils/sendTrackingEvent";
import { getThemeKind } from "../common/App/styles";
import { CrossIcon } from "../common/icons/CrossIcon";
import { DockerLogoIcon } from "../common/icons/DockerLogoIcon";
import { GradleLogoIcon } from "../common/icons/GradleLogoIcon";
import { SlackLogoIcon } from "../common/icons/SlackLogoIcon";
import { TerminalIcon } from "../common/icons/TerminalIcon";
import * as s from "./styles";

const ACTION_PREFIX = "TROUBLESHOOTING";

const actions = addPrefix(ACTION_PREFIX, {
  CLOSE: "CLOSE"
});

const TRACKING_PREFIX = "troubleshooting";

export const trackingEvents = addPrefix(
  TRACKING_PREFIX,
  {
    PAGE_LOADED: "page loaded",
    RUN_OPTION_BUTTON_CLICKED: "run option button clicked",
    CLOSE_BUTTON_CLICKED: "close button clicked",
    SLACK_LINK_CLICKED: "slack link clicked"
  },
  " "
);

const getRunOptionButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

const getCloseButtonIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#6e6e6e";
    case "dark":
    case "dark-jetbrains":
      return "#9b9b9b";
  }
};

export const Troubleshooting = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const runOptionButtonIconColor = getRunOptionButtonIconColor(theme);
  const closeButtonIconColor = getCloseButtonIconColor(theme);

  useEffect(() => {
    sendTrackingEvent(trackingEvents.PAGE_LOADED);
  }, []);

  const runOptions = [
    {
      key: "terminal",
      icon: TerminalIcon,
      label: "I run it via terminal"
    },
    {
      key: "docker",
      icon: DockerLogoIcon,
      label: "I run it on Docker"
    },
    {
      key: "gradle-tasks",
      icon: GradleLogoIcon,
      label: "I run it using native Gradle tasks"
    }
  ];

  const handleCloseButtonClick = () => {
    sendTrackingEvent(trackingEvents.CLOSE_BUTTON_CLICKED);

    window.sendMessageToDigma({
      action: actions.CLOSE
    });
  };

  const handleRunOptionButtonClick = (key: string) => {
    sendTrackingEvent(trackingEvents.RUN_OPTION_BUTTON_CLICKED, {
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
    sendTrackingEvent(trackingEvents.SLACK_LINK_CLICKED);
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  return (
    <s.Container>
      <s.Header>
        Not seeing your application data?
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={closeButtonIconColor} />
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
                <option.icon size={24} color={runOptionButtonIconColor} />
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
            <SlackLogoIcon />
          </s.SlackLogoIconContainer>
          Report this issue and help us improve Digma
        </s.SlackLink>
      </s.Section>
    </s.Container>
  );
};
