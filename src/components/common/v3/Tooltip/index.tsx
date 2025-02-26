import type { Placement } from "@floating-ui/react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useClientPoint,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles
} from "@floating-ui/react";
import type { CSSProperties } from "react";
import { Children, cloneElement, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { isBoolean } from "../../../../typeGuards/isBoolean";
import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import type { TooltipProps } from "./types";

// in pixels
const ARROW_MARGIN = -4;
const ARROW_HEIGHT = 9;
const ARROW_WIDTH = ARROW_HEIGHT;
const GAP = 8;

const getArrowStyles = (placement: Placement, dropShadow: boolean) => {
  let styles: CSSProperties = dropShadow
    ? { filter: "drop-shadow(0 0 6px rgb(0 0 0 / 15%))", zIndex: -1 }
    : {};

  switch (placement) {
    case "top":
    case "top-start":
    case "top-end":
      styles = {
        ...styles,
        marginTop: ARROW_MARGIN
      };
      break;
    case "right":
    case "right-start":
    case "right-end":
      styles = {
        ...styles,
        marginRight: ARROW_MARGIN
      };
      break;
    case "bottom":
    case "bottom-start":
    case "bottom-end":
      styles = {
        ...styles,
        marginBottom: ARROW_MARGIN
      };
      break;
    case "left":
    case "left-start":
    case "left-end":
      styles = {
        ...styles,
        marginLeft: ARROW_MARGIN
      };
  }

  return styles;
};

export const Tooltip = ({
  isOpen: forcedIsOpen,
  placement = "top",
  style,
  children,
  isDisabled,
  fullWidth,
  title,
  boundary,
  followCursor,
  hideArrow,
  className,
  onDismiss
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const theme = useTheme();
  const offsetValue = hideArrow ? GAP : GAP + ARROW_HEIGHT + ARROW_MARGIN;
  const middlewares = [
    offset(offsetValue),
    flip({
      boundary
    }),
    shift({
      boundary,
      padding: 16
    })
  ];
  if (!hideArrow) {
    middlewares.push(
      arrow({
        element: arrowRef
      })
    );
  }

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    whileElementsMounted: autoUpdate,
    placement,
    open: isBoolean(forcedIsOpen) ? forcedIsOpen : isOpen,
    onOpenChange: (open, event) => {
      if (onDismiss && !open && event?.type === "click") {
        onDismiss();
      }

      if (isBoolean(forcedIsOpen)) {
        return;
      }

      setIsOpen(open);
    },
    middleware: [...middlewares, hide()]
  });

  const {
    isMounted
    //  styles: transitionStyles
  } = useTransitionStyles(context, {
    common: {
      transitionTimingFunction: "ease-in-out"
    },
    duration: 150
  });

  const hover = useHover(context, {
    delay: { open: 1000, close: 0 },
    enabled: !isBoolean(forcedIsOpen) || !followCursor
  });

  const dismiss = useDismiss(context, {
    enabled: Boolean(onDismiss),
    outsidePressEvent: "click"
  });

  const clientPoint = useClientPoint(context, {
    enabled: Boolean(followCursor)
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    clientPoint,
    dismiss
  ]);

  const renderArrow = (withShadow: boolean) => (
    <FloatingArrow
      ref={arrowRef}
      context={context}
      fill={
        isString(style?.background)
          ? style?.background
          : theme.colors.v3.stroke.tertiary
      }
      width={ARROW_WIDTH}
      height={ARROW_HEIGHT}
      d={
        "M4.87.5a1 1 0 0 0-1.74 0L.97 4.25a1 1 0 0 0 .86 1.5h4.34a1 1 0 0 0 .86-1.5L4.87.5Z"
      }
      style={{
        ...getArrowStyles(context.placement, withShadow)
      }}
    />
  );

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, {
          ref: refs.setReference,
          ...getReferenceProps()
        })
      )}
      {!isDisabled &&
        (isBoolean(forcedIsOpen) ? forcedIsOpen && isMounted : isMounted) && (
          <FloatingPortal>
            <s.TooltipContainer
              className={className}
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                // TODO: enable appearance animation of tooltip
                // disabled due to constant re-rendering
                // ...transitionStyles,
                display: middlewareData.hide?.referenceHidden
                  ? "none"
                  : "initial",
                ...style
              }}
              {...getFloatingProps()}
            >
              {!hideArrow && (
                <>
                  {renderArrow(true)}
                  {renderArrow(false)}
                </>
              )}
              <s.Tooltip $fullWidth={fullWidth}>{title}</s.Tooltip>
            </s.TooltipContainer>
          </FloatingPortal>
        )}
    </>
  );
};
