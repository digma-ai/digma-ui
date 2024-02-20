import * as s from "./styles";
import { TagProps } from "./types";

export const Tag = (props: TagProps) => {
  return (
    <s.Container $type={props.type}>
      <s.ValueContainer>{props.content}</s.ValueContainer>
    </s.Container>
  );
};
