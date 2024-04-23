import * as s from "./styles";
import { AssetLinkProps } from "./types";

export const AssetLink = ({ text, onClick, className }: AssetLinkProps) => (
  <s.StyledListItem className={className} name={text} onClick={onClick} />
);
