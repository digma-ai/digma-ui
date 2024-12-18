import * as s from "./styles";
import type { EmptyStateProps } from "./types";

export const EmptyState = ({
  icon,
  title,
  message,
  customContent
}: EmptyStateProps) => (
  <s.Container>
    <s.ContentContainer>
      {icon && <s.IconContainer>{icon}</s.IconContainer>}
      {(title ?? message) && (
        <s.TextContainer>
          {title && <s.Title>{title}</s.Title>}
          {message && <span>{message}</span>}
        </s.TextContainer>
      )}
      {customContent}
    </s.ContentContainer>
  </s.Container>
);
