import * as s from "./styles";
import { TagProps } from "./types";

export const Tag = (props: TagProps) => (
  <s.Container $type={props.type}>
    <s.ValueContainer>{props.content}</s.ValueContainer>
  </s.Container>
);
