import { LightBulbIcon } from "../../common/icons/LightBulbIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/OpenTelemetryLogoIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { SectionDescription, SectionIconContainer } from "../styles";
import * as s from "./styles";

export const FinishStep = () => (
  <s.Container>
    <s.SectionTitle>
      <SectionIconContainer>
        <PlayIcon size={16} color={"#fff"} />
      </SectionIconContainer>
      Run / Debug your application
    </s.SectionTitle>
    <SectionDescription>
      Run or debug your application and trigger some actions or APIs to collect
      observability.
    </SectionDescription>
    <s.IllustrationContainer>
      <s.RunOrDebugIllustration
        src={"/videos/runOrDebug.mp4"}
        autoPlay={true}
        loop={true}
      />
    </s.IllustrationContainer>
    <s.SectionTitle>
      <SectionIconContainer>
        <OpenTelemetryLogoIcon size={16} color={"#fff"} />
      </SectionIconContainer>
      Observability Panel
    </s.SectionTitle>
    <SectionDescription>
      You&apos;ll be able to see the results in the observability panel below,
      you can open it by clicking on the &quot;Telescope&quot;.
    </SectionDescription>
    <s.IllustrationContainer>
      <s.ObservabilityPanelIllustration
        src={"/videos/observabilityPanel.mp4"}
        autoPlay={true}
        loop={true}
      />
    </s.IllustrationContainer>
    <s.TipContainer>
      <SectionIconContainer>
        <LightBulbIcon size={16} color={"#b9c2eb"} />
      </SectionIconContainer>
      More and more information about your code will continue to appear as you
      perform more actions.
    </s.TipContainer>
  </s.Container>
);
