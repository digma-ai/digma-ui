import { Tag } from "../../../common/v3/Tag";
import { Tooltip } from "../../../common/v3/Tooltip";
import { TableTagProps } from "./types";

export const TableTag = ({ content, title }: TableTagProps) => (
  <Tooltip title={title}>
    <Tag content={content} />
  </Tooltip>
);
