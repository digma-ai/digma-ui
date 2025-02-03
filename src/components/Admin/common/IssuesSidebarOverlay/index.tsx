import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../tracking";
import { IssuesSidebar } from "./IssuesSidebar";
import * as s from "./styles";
import type { IssuesSidebarOverlayProps } from "./types";

export const MIN_SIDEBAR_WIDTH = 382; // in pixels
export const MAX_SIDEBAR_WIDTH = 640; // in pixels
export const DEFAULT_SIDEBAR_WIDTH_RATIO = 0.33;

export const getDefaultSidebarWidth = (windowWidth: number) => {
  const defaultWidth = windowWidth * DEFAULT_SIDEBAR_WIDTH_RATIO;
  if (defaultWidth > MAX_SIDEBAR_WIDTH) {
    return MAX_SIDEBAR_WIDTH;
  }

  if (defaultWidth < MIN_SIDEBAR_WIDTH) {
    return MIN_SIDEBAR_WIDTH;
  }

  return defaultWidth;
};

export const IssuesSidebarOverlay = ({
  isSidebarOpen,
  onSidebarClose,
  issuesSidebarQuery,
  scopeDisplayName
}: IssuesSidebarOverlayProps) => {
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isIssuesSidebarTransitioning, setIsIssuesSidebarTransitioning] =
    useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const defaultSidebarWidth = getDefaultSidebarWidth(windowWidth);
  const [isResizeHandlePressed, setIsResizeHandlePressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const [left, setLeft] = useState(windowWidth - defaultSidebarWidth);
  const [startLeft, setStartLeft] = useState(0);
  const isPaginationEnabled = isUndefined(issuesSidebarQuery?.limit);

  const handleOverlayClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ISSUES_SIDEBAR_OVERLAY_CLICKED);
    onSidebarClose();
  };

  const handleIssuesSidebarClose = () => {
    onSidebarClose();
  };

  const handleIssuesSidebarTransitionStart = () => {
    setIsIssuesSidebarTransitioning(true);
  };

  const handleIssuesSidebarTransitionEnd = () => {
    setIsIssuesSidebarTransitioning(false);
  };

  const handleResizeHandleMouseDown = (e: React.MouseEvent) => {
    setIsResizeHandlePressed(true);
    setStartX(e.clientX);
    setStartLeft(left);
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const newLeft = windowWidth - getDefaultSidebarWidth(windowWidth);
    setLeft(newLeft);
  }, [windowWidth]);

  useEffect(() => {
    if (!isResizeHandlePressed) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = startLeft + (e.clientX - startX);
      if (
        newLeft >= windowWidth - MAX_SIDEBAR_WIDTH &&
        newLeft <= windowWidth - MIN_SIDEBAR_WIDTH
      ) {
        setLeft(newLeft);
      }
    };

    const handleMouseUp = () => {
      sendUserActionTrackingEvent(
        trackingEvents.ISSUES_SIDEBAR_RESIZE_HANDLE_MOUSE_BUTTON_RELEASED
      );
      setIsResizeHandlePressed(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizeHandlePressed, windowWidth, startX, startLeft, left]);

  return (
    <>
      <CSSTransition
        in={isSidebarOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.overlayTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={overlayRef}
      >
        <s.Overlay
          ref={overlayRef}
          $isVisible={isSidebarOpen}
          $transitionClassName={s.overlayTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
          onClick={handleOverlayClick}
        />
      </CSSTransition>
      <CSSTransition
        in={isSidebarOpen}
        timeout={s.TRANSITION_DURATION}
        classNames={s.sidebarContainerTransitionClassName}
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={sidebarContainerRef}
        onEnter={handleIssuesSidebarTransitionStart}
        onEntered={handleIssuesSidebarTransitionEnd}
        onExit={handleIssuesSidebarTransitionStart}
        onExited={handleIssuesSidebarTransitionEnd}
      >
        <s.IssuesSidebarContainer
          style={{ left }}
          ref={sidebarContainerRef}
          $transitionClassName={s.sidebarContainerTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
        >
          <IssuesSidebar
            query={issuesSidebarQuery?.query}
            isResizing={isResizeHandlePressed}
            onClose={handleIssuesSidebarClose}
            isTransitioning={isIssuesSidebarTransitioning}
            onResizeHandleMouseDown={handleResizeHandleMouseDown}
            scopeDisplayName={scopeDisplayName}
            isPaginationEnabled={isPaginationEnabled}
            title={issuesSidebarQuery?.title}
          />
        </s.IssuesSidebarContainer>
      </CSSTransition>
    </>
  );
};
