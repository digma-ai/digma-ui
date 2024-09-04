import * as s from "./styles";
import { EmptyStateProps } from "./types";

export const NewEmptyState = ({
  icon: Icon,
  title,
  content
}: EmptyStateProps) => {
  return (
    <s.Container>
      {Icon && (
        <s.IconContainer>
          <Icon size={32} color={"currentColor"} />
        </s.IconContainer>
      )}
      <s.Title>{title}</s.Title>
      {content}
    </s.Container>
  );
};
