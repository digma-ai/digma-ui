import * as s from "./styles";
import { CardProps } from "./types";

export const Card = (props: CardProps) => (
  <s.Container className={props.className}>
    {props.showTitle && props.title}
    <s.Content>
      <s.Header>{props.header}</s.Header>
      {props.content}
      {props.buttons && (
        <s.ButtonsContainer>{props.buttons}</s.ButtonsContainer>
      )}
    </s.Content>
  </s.Container>
);
