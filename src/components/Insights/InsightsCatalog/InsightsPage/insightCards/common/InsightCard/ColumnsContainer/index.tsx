import * as s from "./styles";
import { ColumnsContainerProps } from "./types";

export const ColumnsContainer = (props: ColumnsContainerProps) => (
  <s.Container>{props.children}</s.Container>
);
