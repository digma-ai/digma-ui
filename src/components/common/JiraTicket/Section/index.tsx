import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import { SectionProps } from "./types";

export const Section = ({
  selectable,
  title,
  children,
  errorMessage
}: SectionProps) => (
  <s.Container $selectable={selectable}>
    <s.Label>{title}</s.Label>
    {children}
    {isString(errorMessage) && <s.ErrorMessage>{errorMessage}</s.ErrorMessage>}
  </s.Container>
);
