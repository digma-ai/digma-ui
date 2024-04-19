import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import { SectionNumber } from "../Page/styles";
import * as s from "./styles";

export const GetEnvironmentIdInstruction = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const steps = [
    {
      id: "how-to-setup-menu-item",
      description: (
        <span>
          Click on the environment options menu in the observability panel and
          select How to setup
        </span>
      ),
      image: (
        <img src={`/images/howToSetupEnvironmentMenuItem_${themeKind}.svg`} />
      )
    },
    {
      id: "copy-environment-id",
      description: (
        <span>Copy the Environment ID value from the instructions page</span>
      ),
      image: <img src={`/images/environmentId_${themeKind}.svg`} />
    }
  ];

  return (
    <s.Container>
      <s.TitleSection>
        <span>Follow the steps to get your Environment ID</span>
      </s.TitleSection>
      {steps.map((x, i) => (
        <s.Section key={x.id}>
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
