import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import { SectionNumber } from "../Page/styles";
import * as s from "./styles";

export const GetEnvironmentIdInstruction = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <s.TitleSection>
        <span>Follow the steps to get your Environment ID</span>
        <s.Arrow src={"/images/longArrow.svg"} />
      </s.TitleSection>
      <s.Section>
        <SectionNumber>1</SectionNumber>
        <s.SectionContent>
          <span>
            Click on hamburger menu next to your Environment in the
            Observability panel, and choose <s.Term>How to setup</s.Term>
          </span>
          <img src={`/images/howToSetupEnvironmentMenuItem_${themeKind}.svg`} />
        </s.SectionContent>
      </s.Section>
      <s.Section>
        <s.SectionContent>
          <SectionNumber>2</SectionNumber>
          <span>
            On the <s.Term>How to setup your Digma Environment</s.Term> screen
            you can find your Environment ID
          </span>
          <img src={`/images/environmentId_${themeKind}.svg`} />
        </s.SectionContent>
      </s.Section>
    </s.Container>
  );
};
