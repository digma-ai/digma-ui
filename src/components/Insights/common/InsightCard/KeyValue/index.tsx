import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { KeyValueProps } from "./types";

const KeyValueComponent = (
  props: KeyValueProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <s.Container className={props.className} ref={ref}>
      <s.Key>{props.label}</s.Key>
      <s.Value>{props.children}</s.Value>
    </s.Container>
  );
};

export const KeyValue = forwardRef(KeyValueComponent);
