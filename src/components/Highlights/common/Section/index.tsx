import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import type { SectionProps } from "./types";

export const Section = ({ title, toolbarContent, children }: SectionProps) => (
  <s.Container>
    {(isString(title) || toolbarContent) && (
      <s.Header>
        {title}
        <div>{toolbarContent}</div>
      </s.Header>
    )}
    {children}
  </s.Container>
);
