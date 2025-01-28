import { useTheme } from "styled-components";
import { getThemeKind } from "../../../common/App/styles";
import { HomeSection } from "../HomeSection";
import * as s from "./styles";
import { TopIssuesWidget } from "./TopIssuesWidget";
import type { OverviewProps } from "./types";

export const Overview = ({ onGetIssues }: OverviewProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <HomeSection title={"Overview"}>
      <s.WidgetsContainer>
        <TopIssuesWidget onGetIssues={onGetIssues} />
        {[1, 2, 3].map((x) => (
          <s.OverviewWidgetPlaceholderImage
            key={x}
            src={`/assets/images/admin/home/placeholders/overviewWidgetPlaceholder${x}_${themeKind}.svg`}
          />
        ))}
      </s.WidgetsContainer>
    </HomeSection>
  );
};
