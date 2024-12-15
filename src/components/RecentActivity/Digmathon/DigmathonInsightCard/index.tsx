import * as s from "./styles";
import type { DigmathonInsightCardProps } from "./types";

export const DigmathonInsightCard = ({
  number,
  data,
  isActive
}: DigmathonInsightCardProps) => (
  <s.Container $isActive={isActive}>
    <s.GradientBackground />
    <s.NumberContainer>{number}</s.NumberContainer>
    <s.TextContainer>
      <s.Title>{data.title}</s.Title>
      <s.Description>{data.description}</s.Description>
    </s.TextContainer>
    <s.IllustrationContainer>{data.illustration}</s.IllustrationContainer>
  </s.Container>
);
