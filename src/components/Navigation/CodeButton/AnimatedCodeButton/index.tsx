import * as s from "./styles";
import type { AnimatedCodeButtonProps } from "./types";

export const AnimatedCodeButton = ({ onClick }: AnimatedCodeButtonProps) => (
  <s.Button onClick={onClick}>
    <s.BorderContainer />
    <s.Background>
      <s.InitialMask />
      <s.EndMask />
    </s.Background>
  </s.Button>
);
