import { Tooltip } from "../../../common/v3/Tooltip";
import { TableTextProps } from "./types";

export const TableText = ({ title, children }: TableTextProps) => (
  <Tooltip title={title}>
    <span>{children}</span>
  </Tooltip>
);
