import * as s from "./styles";
import { PopupProps } from "./types";

export const Popup = (props: PopupProps) => (
  <s.Container className={props.className} $height={props.height}>
    {props.header && <div>{props.header}</div>}
    <s.ContentContainer>{props.children}</s.ContentContainer>
  </s.Container>
);
