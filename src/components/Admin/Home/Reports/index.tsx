import { useTheme } from "styled-components";
import { getThemeKind } from "../../../common/App/styles";
import { ReportWidget } from "./ReportWidget";
import * as s from "./styles";

export const Reports = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <s.Section title={"Your reports"}>
        <s.WidgetsContainer>
          {[
            {
              title: "Code issues",
              route: "/reports/code-issues",
              backgroundImage: `/assets/images/admin/home/codeIssuesThumbnail_${themeKind}.svg`,
              isEnabled: true
            },
            {
              title: "Breaking changes",
              route: "#",
              backgroundImage: `/assets/images/admin/home/breakingChangesThumbnail_${themeKind}.svg`,
              isEnabled: false
            },
            {
              title: "Critical issues tracking",
              route: "#",
              backgroundImage: `/assets/images/admin/home/criticalIssuesTrackingThumbnail_${themeKind}.svg`,
              isEnabled: false
            }
          ].map((x, i) => (
            <ReportWidget
              key={i}
              title={x.title}
              route={x.route}
              backgroundImage={x.backgroundImage}
              isEnabled={x.isEnabled}
            />
          ))}
        </s.WidgetsContainer>
      </s.Section>
    </s.Container>
  );
};
