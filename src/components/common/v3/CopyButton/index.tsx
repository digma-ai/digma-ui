import copy from "copy-to-clipboard";
import { MouseEvent } from "react";
import { CopyIcon } from "../../icons/16px/CopyIcon";
import { IconButton } from "../IconButton";
import { Tooltip } from "../Tooltip";
import { CopyButtonProps } from "./types";

export const CopyButton = ({ text, className }: CopyButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copy(text);
  };

  return (
    <Tooltip title={"Copy"}>
      <IconButton
        className={className}
        icon={{ component: CopyIcon, size: 16 }}
        onClick={handleClick}
      />
    </Tooltip>
  );
};
