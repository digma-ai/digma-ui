import * as s from "./styles";
import { ColumnsContainerProps } from "./types";

export const ColumnsContainer = ({ children }: ColumnsContainerProps) => (
  <s.Container>{children}</s.Container>
);
