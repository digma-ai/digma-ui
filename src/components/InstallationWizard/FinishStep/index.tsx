import { DefaultTheme, useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { GearIcon } from "../../common/icons/GearIcon";
import { LightBulbIcon } from "../../common/icons/LightBulbIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/OpenTelemetryLogoIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { Link } from "../styles";
import * as s from "./styles";
import { FinishStepProps } from "./types";

const getTipIconColor = (theme: DefaultTheme): string => {
  switch (theme.mode) {
    case "light":
      return "#788ca9";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
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
      <s.SectionTitle icon={OpenTelemetryLogoIcon}>
        Observability Panel
      </s.SectionTitle>
      <s.SectionDescription>
        You&apos;ll be able to see the results in the observability panel below,
        you can open it by clicking on the &quot;Telescope&quot;.
      </s.SectionDescription>
      <s.IllustrationContainer>
        <s.ObservabilityPanelIllustration
          src={`/images/observabilityPanel_${themeKind}.gif`}
        />
      </s.IllustrationContainer>
      <s.TipContainer>
        <s.TipIconContainer>
          <LightBulbIcon size={16} color={getTipIconColor(theme)} />
        </s.TipIconContainer>
        More and more information about your code will continue to appear as you
        perform more actions.
      </s.TipContainer>
    </s.Container>
  );
};
