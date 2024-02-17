import * as s from "./styles";
import { PopupProps } from "./types";

export const Popup = (props: PopupProps) => (
  <s.Container $height={props.height}>{props.children}</s.Container>
);
