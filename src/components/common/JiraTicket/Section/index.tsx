import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import { SectionProps } from "./types";

export const Section = (props: SectionProps) => {
  return (
    <s.Container $selectable={props.selectable}>
      <s.Label>{props.title}</s.Label>
      {props.children}
      {isString(props.errorMessage) && (
        <s.ErrorMessage>{props.errorMessage}</s.ErrorMessage>
      )}
    </s.Container>
  );
};
