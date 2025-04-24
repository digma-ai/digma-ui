import { type MouseEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../../common/icons/16px/CrossIcon";
import { TwoVerticalLinesIcon } from "../../../../common/icons/16px/TwoVerticalLinesIcon";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import type { SidebarProps } from "./types";

export const Sidebar = ({
  onClose,
  isResizing,
  onResizeHandleMouseDown,
  isResizable,
  content,
  className,
  title
}: SidebarProps) => {
  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_CLOSE_BUTTON_CLICKED);
    onClose();
  };

  const handleSidebarResizeHandleMouseDown = (e: MouseEvent) => {
    sendUserActionTrackingEvent(
      trackingEvents.SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_PRESSED
    );
    onResizeHandleMouseDown?.(e);
  };

  return (
    <s.Container $isResizing={isResizing} className={className}>
      <s.HeaderContainer>
        <s.TitleRow>
          <span>{title}</span>
          <NewIconButton
            buttonType={"secondaryBorderless"}
            icon={CrossIcon}
            onClick={handleCloseButtonClick}
          />
        </s.TitleRow>
        {content.header}
      </s.HeaderContainer>
      <s.ContentContainer>
        {isResizable && (
          <s.ResizeHandle onMouseDown={handleSidebarResizeHandleMouseDown}>
            <TwoVerticalLinesIcon size={16} color={"currentColor"} />
          </s.ResizeHandle>
        )}
        {content.body}
      </s.ContentContainer>
    </s.Container>
  );
};
