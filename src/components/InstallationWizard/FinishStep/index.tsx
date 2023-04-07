import { DefaultTheme, useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { LightBulbIcon } from "../../common/icons/LightBulbIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/OpenTelemetryLogoIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { SectionDescription } from "../styles";
import * as s from "./styles";

const getTipIconColor = (theme: DefaultTheme): string => {
  switch (theme.mode) {
    case "light":
      return "#788ca9";
    case "dark":
    case "dark-jetbrains":
      return "#b9c2eb";
  }
};

export const FinishStep = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <s.SectionTitle icon={PlayIcon}>
        Run / Debug your application
      </s.SectionTitle>
      <SectionDescription>
        Run or debug your application and trigger some actions or APIs to
        collect observability.
      </SectionDescription>
      <s.IllustrationContainer>
        <s.RunOrDebugIllustration src={`/images/runOrDebug_${themeKind}.gif`} />
      </s.IllustrationContainer>
      <s.SectionTitle icon={OpenTelemetryLogoIcon}>
        Observability Panel
      </s.SectionTitle>
      <SectionDescription>
        You&apos;ll be able to see the results in the observability panel below,
        you can open it by clicking on the &quot;Telescope&quot;.
      </SectionDescription>
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
