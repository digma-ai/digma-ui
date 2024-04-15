import { DigmaLoginLogo } from "../../common/icons/DigmaLoginLogo";
import { RecentActivityContainerBackgroundGradient } from "../styles";
import * as s from "./styles";

export const WelcomeScreen = () => {
  return (
    <s.NoUserContainer>
      <s.Background />
      <RecentActivityContainerBackgroundGradient />
      <DigmaLoginLogo />
      <s.Container>
        <s.Title>Welcome to Digma</s.Title>
        <s.Text>Please sign-in/sign-up first to use Digma</s.Text>
      </s.Container>
    </s.NoUserContainer>
  );
};
