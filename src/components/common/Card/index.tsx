import * as s from "./styles";
import type { CardProps } from "./types";

export const Card = ({
  className,
  showTitle,
  title,
  header,
  content,
  buttons
}: CardProps) => (
  <s.Container className={className}>
    {showTitle && title}
    <s.Content>
      <s.Header>{header}</s.Header>
      {content}
      {buttons && <s.ButtonsContainer>{buttons}</s.ButtonsContainer>}
    </s.Content>
  </s.Container>
);
