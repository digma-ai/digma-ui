import * as s from "./styles";
import { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <s.Container onClick={handleClick}>
      <s.ContentContainer>
        {props.icon}
        {props.label}
      </s.ContentContainer>
    </s.Container>
  );
};
