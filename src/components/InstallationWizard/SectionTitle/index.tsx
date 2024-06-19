import * as s from "./styles";
import { SectionTitleProps } from "./types";

export const SectionTitle = ({
  className,
  icon: Icon,
  children
}: SectionTitleProps) => (
  <s.Container className={className}>
    {Icon && (
      <s.IconContainer>
        <Icon size={16} color={"currentColor"} />
      </s.IconContainer>
    )}
    {children}
  </s.Container>
);
