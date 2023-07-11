import * as s from "./styles";
import { CardProps } from "./types";

export const Card = (props: CardProps) => (
  <s.Container>
    <s.Header>{props.header}</s.Header>
    {props.content}
  </s.Container>
);
