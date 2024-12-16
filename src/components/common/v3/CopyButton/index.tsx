import copy from "copy-to-clipboard";
import type { MouseEvent } from "react";
import { trackingEvents as globalEvents } from "../../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CopyIcon } from "../../icons/16px/CopyIcon";
import { IconButton } from "../IconButton";
import { Tooltip } from "../Tooltip";
import type { CopyButtonProps } from "./types";

export const CopyButton = ({ text, className }: CopyButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    copy(text);
    sendUserActionTrackingEvent(globalEvents.COPY_BTN_CLICKED);
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
