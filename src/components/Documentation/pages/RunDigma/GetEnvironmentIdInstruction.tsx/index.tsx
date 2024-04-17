import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import { SectionNumber } from "../Page/styles";
import * as s from "./styles";

export const GetEnvironmentIdInstruction = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <s.TitleColumn>
        <span>Follow the steps to get your Environment ID</span>
        <s.Arrow src={"/images/longArrow.svg"} />
      </s.TitleColumn>
      <s.Column>
        <s.Step>
          <SectionNumber>1</SectionNumber>
          <span>
            Click on hamburger menu next to your Environment in the
            Observability panel, and choose <s.Term>How to setup</s.Term>
          </span>
          <img src={`/images/howToSetupEnvironmentMenuItem_${themeKind}.svg`} />
        </s.Step>
      </s.Column>
      <s.Column>
        <s.Step>
          <SectionNumber>2</SectionNumber>
          <span>
            On the <s.Term>How to setup your Digma Environment</s.Term> screen
            you can find your Environment ID
          </span>
          <img src={`/images/environmentId_${themeKind}.svg`} />
        </s.Step>
      </s.Column>
    </s.Container>
  );
};
