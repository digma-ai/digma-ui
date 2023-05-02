import { DefaultTheme, useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { BellIcon } from "../../common/icons/BellIcon";
import { GearIcon } from "../../common/icons/GearIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { Link } from "../styles";
import * as s from "./styles";
import { FinishStepProps } from "./types";

const getPlayIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#3538cd";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

export const FinishStep = (props: FinishStepProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      {props.quickstartURL && (
        <>
          <s.SectionTitle icon={GearIcon}>Instrument your code</s.SectionTitle>
          <s.SectionDescription>
            Follow our{" "}
            <Link
              target={"_blank"}
              rel={"noopener noreferrer"}
              href={props.quickstartURL}
            >
              quickstart
            </Link>{" "}
            guide to begin collecting data from your code
          </s.SectionDescription>
        </>
      )}
      <s.SectionTitle icon={BellIcon}>
        Stay Up To Date<s.SectionTitleNote>(optional)</s.SectionTitleNote>
      </s.SectionTitle>
      <s.SectionDescription>
        Enter your E-mail address to be the first to get Digma updates
      </s.SectionDescription>
      <s.EmailInput
        type={"text"}
        placeholder={"Enter E-mail"}
        onChange={props.onEmailChange}
        value={props.email}
      />
      {props.emailErrorMessage && (
        <s.ErrorMessage>{props.emailErrorMessage}</s.ErrorMessage>
      )}
      <s.SlackLink
        target={"_blank"}
        rel={"noopener noreferrer"}
        href={props.slackChannelURL}
      >
        <SlackLogoIcon />
        Join our Slack channel
      </s.SlackLink>
      <s.SectionTitle icon={PlayIcon}>
        Run / Debug your application
      </s.SectionTitle>
      <s.SectionDescription>
        Run or debug your application and trigger some actions or APIs to
        collect observability.
      </s.SectionDescription>
      <s.IllustrationContainer>
        <s.RunOrDebugIllustration src={`/images/runOrDebug_${themeKind}.gif`} />
      </s.IllustrationContainer>
      <s.SectionTitle>Getting Started</s.SectionTitle>
      <s.SectionDescription>
        We&apos;ve prepared a short video to show you the ropes on getting
        started analyzing your code with Digma.
      </s.SectionDescription>
      <Link
        href={"https://www.youtube.com/watch?v=jzBEXfCrnlg"}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <s.IllustrationContainer>
          <s.PlayIconContainer>
            <s.ThumbnailPlayCircleIcon color={getPlayIconColor(theme)} />
          </s.PlayIconContainer>
          <s.GettingStartedVideoThumbnail
            src={`/images/gettingStartedVideoThumbnail_${themeKind}.png`}
          />
        </s.IllustrationContainer>
      </Link>
    </s.Container>
  );
};
