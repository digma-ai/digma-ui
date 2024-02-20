import * as s from "./styles";
import { GlowingIconButtonProps } from "./types";

export const GlowingIconButton = (props: GlowingIconButtonProps) => (
  <s.BorderContainer $type={props.type}>
    <s.BorderlessIconButton icon={props.icon} onClick={props.onClick} />
  </s.BorderContainer>
);
