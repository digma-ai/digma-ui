import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles
} from "@floating-ui/react";
import { CSSProperties, Children, cloneElement, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { isBoolean } from "../../../../typeGuards/isBoolean";
import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import { TooltipProps } from "./types";

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

export const Tooltip = (props: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const theme = useTheme();

  const placement = props.placement || "top";

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    placement,
    open: isBoolean(props.isOpen) ? props.isOpen : isOpen,
    onOpenChange: isBoolean(props.isOpen) ? undefined : setIsOpen,
    middleware: [
      offset(GAP + ARROW_HEIGHT + ARROW_MARGIN),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    common: {
      transitionTimingFunction: "ease-in-out"
    },
    duration: 150
  });

  const hover = useHover(context, {
    delay: { open: 1000, close: 0 },
    enabled: !isBoolean(props.isOpen)
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const renderArrow = (withShadow: boolean) => (
    <FloatingArrow
      ref={arrowRef}
      context={context}
      fill={
        isString(props.style?.background)
          ? props.style?.background
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
      {Children.map(props.children, (child) =>
        cloneElement(child, {
          ref: refs.setReference,
          ...getReferenceProps()
        })
      )}
      {!props.isDisabled &&
        (isBoolean(props.isOpen) ? props.isOpen && isMounted : isMounted) && (
          <FloatingPortal>
            <s.TooltipContainer
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                ...transitionStyles,
                ...props.style
              }}
              {...getFloatingProps()}
            >
              {renderArrow(true)}
              {renderArrow(false)}
              <s.Tooltip $fullWidth={props.fullWidth}>{props.title}</s.Tooltip>
            </s.TooltipContainer>
          </FloatingPortal>
        )}
    </>
  );
};
