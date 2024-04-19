import { Tooltip } from "../../../common/v3/Tooltip";
import { TableTextProps } from "./types";

export const TableText = ({ title, children, className }: TableTextProps) => (
  <Tooltip title={title}>
    <span className={className}>{children}</span>
  </Tooltip>
);
