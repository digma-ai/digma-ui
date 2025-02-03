import * as s from "./styles";
import type { HomeSectionProps } from "./types";

export const HomeSection = ({
  title,
  children,
  className
}: HomeSectionProps) => (
  <s.Section className={className}>
    <s.Header>{title}</s.Header>
    {children}
  </s.Section>
);
