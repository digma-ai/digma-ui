import * as s from "./styles";
import { LinkProps } from "./types";

export const SpanLink = (props: LinkProps) => {
  const handleClick = () => {
    props.onClick();
  };

  return <s.Link onClick={handleClick}>{props.text}</s.Link>;
};
