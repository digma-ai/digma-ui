import * as s from "./styles";
import type { HomeSectionProps } from "./types";

export const HomeSection = ({ title, children }: HomeSectionProps) => (
  <s.Section>
    <s.Header>{title}</s.Header>
    {children}
  </s.Section>
);
