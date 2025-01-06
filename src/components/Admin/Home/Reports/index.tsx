import { HomeSection } from "../HomeSection";
import { ReportWidget } from "./ReportWidget";
import * as s from "./styles";

export const Reports = () => (
  <s.Container>
    <HomeSection title={"Your reports"}>
      <s.WidgetsContainer>
        {[
          {
            title: "Code issues",
            route: "/reports/code-issues",
            // TODO: Replace with themed image
            backgroundImage: "/assets/images/admin/reports/codeIssues_dark.svg",
            isEnabled: true
          },
          {
            title: "Breaking changes",
            route: "#",
            // TODO: Replace with themed image
            backgroundImage: "/assets/images/admin/reports/codeIssues_dark.svg",
            isEnabled: false
          },
          {
            title: "Critical issues tracking",
            route: "#",
            // TODO: Replace with themed image
            backgroundImage: "/assets/images/admin/reports/codeIssues_dark.svg",
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
    </HomeSection>
  </s.Container>
);
