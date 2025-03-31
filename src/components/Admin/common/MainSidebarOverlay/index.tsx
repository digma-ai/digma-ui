import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { trackingEvents } from "../../tracking";
import { MainSidebar } from "./MainSidebar";
import * as s from "./styles";
import type { MainSidebarOverlayProps } from "./types";

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

export const MainSidebarOverlay = ({
  isSidebarOpen,
  onSidebarClose,
  mainSidebarQuery,
  scopeDisplayName
}: MainSidebarOverlayProps) => {
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMainSidebarTransitioning, setIsMainSidebarTransitioning] =
    useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const defaultSidebarWidth = getDefaultSidebarWidth(windowWidth);
  const [isResizeHandlePressed, setIsResizeHandlePressed] = useState(false);
  const [startX, setStartX] = useState(0);
  const [left, setLeft] = useState(windowWidth - defaultSidebarWidth);
  const [startLeft, setStartLeft] = useState(0);

  const handleOverlayClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ISSUES_SIDEBAR_OVERLAY_CLICKED);
    onSidebarClose();
  };

  const handleMainSidebarClose = () => {
    onSidebarClose();
  };

  const handleMainSidebarTransitionStart = () => {
    setIsMainSidebarTransitioning(true);
  };

  const handleMainSidebarTransitionEnd = () => {
    setIsMainSidebarTransitioning(false);
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
        onEnter={handleMainSidebarTransitionStart}
        onEntered={handleMainSidebarTransitionEnd}
        onExit={handleMainSidebarTransitionStart}
        onExited={handleMainSidebarTransitionEnd}
      >
        <s.MainSidebarContainer
          style={{ left }}
          ref={sidebarContainerRef}
          $transitionClassName={s.sidebarContainerTransitionClassName}
          $transitionDuration={s.TRANSITION_DURATION}
        >
          <MainSidebar
            query={mainSidebarQuery?.query}
            isResizing={isResizeHandlePressed}
            onClose={handleMainSidebarClose}
            isTransitioning={isMainSidebarTransitioning}
            onResizeHandleMouseDown={handleResizeHandleMouseDown}
            scopeDisplayName={scopeDisplayName}
          />
        </s.MainSidebarContainer>
      </CSSTransition>
    </>
  );
};
