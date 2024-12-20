import { HomeSection } from "../HomeSection";
import { ReportWidget } from "./ReportWidget";
import * as s from "./styles";

export const Reports = () => (
  <s.Container>
    <HomeSection title={"Your reports"}>
      <s.WidgetsContainer>
        {[
          {
            title: "Code issues"
          },
          { title: "Breaking changes" },
          { title: "Critical issues tracking" }
        ].map((x, i) => (
          <ReportWidget key={i} title={x.title} />
        ))}
      </s.WidgetsContainer>
    </HomeSection>
  </s.Container>
);
