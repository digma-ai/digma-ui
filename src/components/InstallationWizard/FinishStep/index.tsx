import { useContext } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { GETTING_STARTED_VIDEO_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { getThemeKind } from "../../common/App/styles";
import { CircleLoader } from "../../common/CircleLoader";
import { Link } from "../../common/Link";
import { KeyIcon } from "../../common/icons/16px/KeyIcon";
import { ChatIcon } from "../../common/icons/ChatIcon";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { GearIcon } from "../../common/icons/GearIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { RingingBellIcon } from "../../common/icons/RingingBellIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { SectionDescription } from "../styles";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { FinishStepProps } from "./types";

const EMAIL_ERROR_MESSAGE = "Enter a valid email";

const getErrorIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#e00036";
    case "dark":
    case "dark-jetbrains":
      return "#f93967";
  }
};

export const FinishStep = ({
  quickstartURL,
  productKey,
  onProductKeyInputChange,
  email,
  onEmailInputChange,
  isEmailValidating,
  isEmailValid,
  errors,
  onSlackLinkClick
}: FinishStepProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const config = useContext(ConfigContext);

  const handleGettingStartedVideoLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GETTING_STARTED_VIDEO_LINK_CLICKED
    );
    openURLInDefaultBrowser(GETTING_STARTED_VIDEO_URL);
  };

  return (
    <s.Container>
      {quickstartURL && (
        <s.Section>
          <s.SectionTitle icon={GearIcon}>Instrument your code</s.SectionTitle>
          <SectionDescription>
            Follow our{" "}
            <Link
              target={"_blank"}
              rel={"noopener noreferrer"}
              href={quickstartURL}
            >
              quickstart
            </Link>{" "}
            guide to begin collecting data from your code
          </SectionDescription>
        </s.Section>
      )}
      {config.isDigmathonModeEnabled && (
        <s.Section>
          <s.SectionTitle icon={KeyIcon}>
            Product key<s.SectionTitleNote>(optional)</s.SectionTitleNote>
          </s.SectionTitle>
          <SectionDescription>
            If you&apos;ve received a product key, please enter it here
          </SectionDescription>
          <s.TextField>
            <s.TextInput
              type={"text"}
              placeholder={"Product key"}
              value={productKey}
              onChange={onProductKeyInputChange}
            />
          </s.TextField>
        </s.Section>
      )}
      <s.Section>
        <s.SectionTitle icon={RingingBellIcon}>
          Stay up to date
          {!productKey && <s.SectionTitleNote>(optional)</s.SectionTitleNote>}
        </s.SectionTitle>
        <SectionDescription>
          Enter your E-mail address to be the first to get Digma updates
        </SectionDescription>
        <s.TextField>
          <s.TextInput
            type={"text"}
            placeholder={"Enter E-mail"}
            value={email}
            onChange={onEmailInputChange}
          />
          {errors.email && (
            <s.ErrorMessage>
              <WarningCircleLargeIcon color={getErrorIconColor(theme)} />
              {errors.email}
            </s.ErrorMessage>
          )}
          {isEmailValid === false && (
            <s.ErrorMessage>
              <WarningCircleLargeIcon color={getErrorIconColor(theme)} />
              {EMAIL_ERROR_MESSAGE}
            </s.ErrorMessage>
          )}
          {isEmailValid && (
            <s.EmailInputIconContainer>
              <CheckmarkCircleInvertedIcon color={"currentColor"} size={16} />
            </s.EmailInputIconContainer>
          )}
          {isEmailValidating && (
            <s.EmailInputIconContainer>
              <CircleLoader
                size={16}
                colors={{
                  start: "rgb(53 56 205 / 30%)",
                  end: "#fff",
                  background: "#252526"
                }}
              />
            </s.EmailInputIconContainer>
          )}
        </s.TextField>
      </s.Section>
      <s.Section>
        <s.SectionTitle icon={PlayIcon}>
          Run / Debug your application
        </s.SectionTitle>
        <SectionDescription>
          Run or debug your application and trigger some actions or APIs to
          collect observability.
        </SectionDescription>
        <s.IllustrationContainer>
          <s.RunOrDebugIllustration
            src={`/assets/images/runOrDebug_${themeKind}.gif`}
          />
        </s.IllustrationContainer>
      </s.Section>
      <s.Section>
        <s.SectionTitle>Getting started</s.SectionTitle>
        <SectionDescription>
          We&apos;ve prepared a short video to show you the ropes on getting
          started analyzing your code with Digma.
        </SectionDescription>
        <Link onClick={handleGettingStartedVideoLinkClick}>
          <s.IllustrationContainer>
            <s.PlayIconContainer>
              <s.ThumbnailPlayCircleIcon color={"currentColor"} />
            </s.PlayIconContainer>
            <s.GettingStartedVideoThumbnail
              src={`/assets/images/gettingStartedVideoThumbnail_${themeKind}.png`}
            />
          </s.IllustrationContainer>
        </Link>
      </s.Section>
      <s.Section>
        <s.SectionTitle icon={ChatIcon}>Give us feedback</s.SectionTitle>
        <s.SlackLink onClick={onSlackLinkClick}>
          <SlackLogoIcon size={14} />
          Join Our Slack Group
        </s.SlackLink>
      </s.Section>
    </s.Container>
  );
};
