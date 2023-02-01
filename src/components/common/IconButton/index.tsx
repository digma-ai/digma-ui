import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = (props: IconButtonProps) => {
  const handleClick = () => {
    props.onClick();
  };

  return <s.Container onClick={handleClick}>{props.icon}</s.Container>;
};
