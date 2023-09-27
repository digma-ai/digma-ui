import * as s from "./styles";
import { IconButtonProps } from "./types";

export const IconButton = (props: IconButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick(e);
  };

  return (
    <s.Button onClick={handleClick} disabled={props.disabled}>
      <props.icon color={"currentColor"} size={22} />
    </s.Button>
  );
};
