import * as s from "./styles";
import { GlowingIconButtonProps } from "./types";

export const GlowingIconButton = (props: GlowingIconButtonProps) => (
  <s.BorderContainer $type={props.type} onClick={props.onClick}>
    <s.BorderlessIconButton icon={props.icon} />
  </s.BorderContainer>
);
