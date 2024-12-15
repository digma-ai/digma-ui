import * as s from "./styles";
import type { ColumnsContainerProps } from "./types";

export const ColumnsContainer = ({ children }: ColumnsContainerProps) => (
  <s.Container>{children}</s.Container>
);
