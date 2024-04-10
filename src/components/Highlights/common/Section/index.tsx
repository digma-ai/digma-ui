import * as s from "./styles";
import { SectionProps } from "./types";

export const Section = ({ title, toolbarContent, children }: SectionProps) => (
  <s.Container>
    <s.Header>
      {title}
      <div>{toolbarContent}</div>
    </s.Header>
    {children}
  </s.Container>
);
