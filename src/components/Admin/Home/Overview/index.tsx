import { HomeSection } from "../HomeSection";
import { OverviewWidget } from "./OverviewWidget";
import * as s from "./styles";

export const Overview = () => (
  <HomeSection title={"Overview"}>
    <s.WidgetsContainer>
      {/* // TODO: Replace with blurred images */}
      {[1, 2, 3].map((i) => (
        <OverviewWidget key={i}>Overview widget {i}</OverviewWidget>
      ))}
    </s.WidgetsContainer>
  </HomeSection>
);
