import { DigmaLoginLogo } from "../../common/icons/DigmaLoginLogo";
import { RecentActivityContainerBackgroundGradient } from "../styles";
import * as s from "./styles";

export const WelcomeScreen = () => (
  <s.Container>
    <s.Background />
    <RecentActivityContainerBackgroundGradient />
    <DigmaLoginLogo />
    <s.TextContainer>
      <s.Title>Welcome to Digma</s.Title>
      <s.Text>Please sign-in/sign-up first to use Digma</s.Text>
    </s.TextContainer>
  </s.Container>
);
