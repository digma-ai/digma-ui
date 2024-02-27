import * as s from "./styles";
import { AnimatedCodeButtonProps } from "./types";

export const AnimatedCodeButton = (props: AnimatedCodeButtonProps) => (
  <s.Button onClick={props.onClick}>
    <s.BorderContainer />
    <s.Background>
      <s.InitialMask />
      <s.EndMask />
    </s.Background>
  </s.Button>
);
