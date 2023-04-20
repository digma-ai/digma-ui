import { DefaultTheme, useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { GearIcon } from "../../common/icons/GearIcon";
import { PlayCircleIcon } from "../../common/icons/PlayCircleIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
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
            <PlayCircleIcon size={32} color={getPlayIconColor(theme)} />
          </s.PlayIconContainer>
          <s.GettingStartedVideoThumbnail
            src={`/images/gettingStartedVideoThumbnail_${themeKind}.png`}
          />
        </s.IllustrationContainer>
      </Link>
    </s.Container>
  );
};
