import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { TagProps } from "./types";

const TagComponent = (props: TagProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <s.Container className={props.className} $type={props.type} ref={ref}>
      <s.ValueContainer>{props.content}</s.ValueContainer>
    </s.Container>
  );
};

export const Tag = forwardRef(TagComponent);
