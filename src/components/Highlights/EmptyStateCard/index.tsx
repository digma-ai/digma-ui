import useDimensions from "react-cool-dimensions";
import * as s from "./styles";
import { EmptyStateCardProps } from "./types";

export const EmptyStateCard = ({
  type = "default",
  icon: Icon,
  title,
  text,
  customContent,
  blurredContent
}: EmptyStateCardProps) => {
  const { observe, height } = useDimensions();

  return (
    <s.Container $blurredContent={Boolean(blurredContent)} $height={height}>
      <s.BlurredContent ref={observe}>{blurredContent}</s.BlurredContent>
      <s.Card
        $blurredBackground={Boolean(blurredContent)}
        content={
          <s.ContentContainer>
            <s.IconContainer $type={type}>
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
    </s.Container>
  );
};
