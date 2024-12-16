import * as s from "./styles";
import type { InstallationTypeCardProps } from "./types";

export const InstallationTypeCard = ({
  disabled,
  onClick,
  installationType,
  icon,
  title,
  description,
  additionalContent
}: InstallationTypeCardProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(installationType);
    }
  };

  return (
    <s.Container $disabled={disabled} onClick={handleClick}>
      <s.ContentContainer>
        <s.IconContainer>{icon}</s.IconContainer>
        <s.TextContainer>
          <s.Title>{title}</s.Title>
          {description}
        </s.TextContainer>
      </s.ContentContainer>
      {additionalContent && <div>{additionalContent}</div>}
    </s.Container>
  );
};
