import * as s from "./styles";
import { EmptyStateCardProps } from "./types";

export const EmptyStateCard = ({
  type,
  icon: Icon,
  title,
  text,
  customContent
}: EmptyStateCardProps) => (
  <s.Card
    content={
      <s.ContentContainer>
        <s.IconContainer $type={type || "default"}>
          {Icon && <Icon color={"currentColor"} size={16} />}
        </s.IconContainer>
        <s.TextContainer>
          {title && <s.Title>{title}</s.Title>}
          {text && <span>{text}</span>}
        </s.TextContainer>
        {customContent}
      </s.ContentContainer>
    }
  />
);
