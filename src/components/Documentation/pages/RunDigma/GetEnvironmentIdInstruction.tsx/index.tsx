import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import { SectionNumber } from "../Page/styles";
import * as s from "./styles";

export const GetEnvironmentIdInstruction = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const steps = [
    {
      description: (
        <span>
          Click on hamburger menu next to your Environment in the Observability
          panel, and choose <s.Term>How to setup</s.Term>
        </span>
      ),
      image: (
        <img src={`/images/howToSetupEnvironmentMenuItem_${themeKind}.svg`} />
      )
    },
    {
      description: (
        <span>
          On the <s.Term>How to setup your Digma Environment</s.Term> screen you
          can find your Environment ID
        </span>
      ),
      image: <img src={`/images/environmentId_${themeKind}.svg`} />
    }
  ];

  return (
    <s.Container>
      <s.TitleSection>
        <span>Follow the steps to get your Environment ID</span>
        <s.Arrow src={"/images/longArrow.svg"} />
      </s.TitleSection>
      {steps.map((x, i) => (
        <s.Section key={i}>
          <SectionNumber>{i + 1}</SectionNumber>
          <s.SectionContent>
            {x.description}
            {x.image}
          </s.SectionContent>
        </s.Section>
      ))}
    </s.Container>
  );
};
