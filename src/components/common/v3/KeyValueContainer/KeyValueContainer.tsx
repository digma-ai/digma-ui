import * as s from "./styles";
import { KeyValueContainerProps } from "./types";

export const KeyValueContainer = (props: KeyValueContainerProps) => (
  <s.Container>{props.children}</s.Container>
);
