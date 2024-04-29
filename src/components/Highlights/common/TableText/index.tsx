import { Tooltip } from "../../../common/v3/Tooltip";
import * as s from "./styles";
import { TableTextProps } from "./types";
export const TableText = ({ title, children, className }: TableTextProps) => (
  <Tooltip title={title}>
    <s.Text className={className}>{children}</s.Text>
  </Tooltip>
);
