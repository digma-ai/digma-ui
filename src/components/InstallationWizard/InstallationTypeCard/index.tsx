import * as s from "./styles";
import { InstallationTypeCardProps } from "./types";

export const InstallationTypeCard = (props: InstallationTypeCardProps) => {
  const handleClick = () => {
    if (!props.disabled) {
      props.onClick(props.installationType);
    }
  };

  return (
    <s.Container disabled={props.disabled} onClick={handleClick}>
      <s.ContentContainer>
        <s.IconContainer disabled={props.disabled}>
          {props.icon}
        </s.IconContainer>
        <s.TextContainer>
          <s.Title disabled={props.disabled}>{props.title}</s.Title>
          {props.description}
        </s.TextContainer>
      </s.ContentContainer>
      {props.additionalContent && <div>{props.additionalContent}</div>}
    </s.Container>
  );
};
