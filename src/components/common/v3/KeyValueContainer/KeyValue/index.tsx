import * as s from "./styles";
import { KeyValueProps } from "./types";

export const KeyValue = (props: KeyValueProps) => {
  return (
    <s.Container>
      <s.Key>{props.label}</s.Key>
      <s.Value>{props.children}</s.Value>
    </s.Container>
  );
};
