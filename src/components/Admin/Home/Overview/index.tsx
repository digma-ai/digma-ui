import { useTheme } from "styled-components";
import { getThemeKind } from "../../../common/App/styles";
import { HomeSection } from "../HomeSection";
import * as s from "./styles";

export const Overview = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <HomeSection title={"Overview"}>
      <s.WidgetsContainer>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <s.OverviewWidgetPlaceholderImage
              key={i}
              src={`/assets/images/admin/home/placeholders/overviewWidgetPlaceholder${
                i + 1
              }_${themeKind}.svg`}
            />
          ))}
      </s.WidgetsContainer>
    </HomeSection>
  );
};
