import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  arrow,
  flip,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions
} from "@floating-ui/react";
import { Children, cloneElement, useRef, useState } from "react";
import { useTheme } from "styled-components";
import * as s from "./styles";
import { TooltipProps } from "./types";

// in pixels
const ARROW_MARGIN = -3;
const ARROW_HEIGHT = 8;
const GAP = 1;

const getArrowStyles = (placement: Placement) => {
  // TODO: add shadow
  switch (placement) {
    case "top":
    case "top-start":
    case "top-end":
      return {
        marginTop: ARROW_MARGIN
      };
    case "right":
    case "right-start":
    case "right-end":
      return {
        marginRight: ARROW_MARGIN
      };
    case "bottom":
    case "bottom-start":
    case "bottom-end":
      return {
        marginBottom: ARROW_MARGIN
      };
    case "left":
    case "left-start":
    case "left-end":
      return {
        marginLeft: ARROW_MARGIN
      };
  }
};

export const Tooltip = (props: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const theme = useTheme();

  const placement = props.placement || "top";

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(ARROW_HEIGHT + GAP),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  });

  const hover = useHover(context, { delay: { open: 1000, close: 0 } });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      {Children.map(props.children, (child) =>
        cloneElement(child, {
          ref: refs.setReference,
          ...getReferenceProps()
        })
      )}
      {isOpen && (
        <FloatingPortal>
          <s.TooltipContainer
            ref={refs.setFloating}
            style={{
              ...floatingStyles
            }}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill={theme.colors.tooltip.background}
              width={10}
              height={8}
              d={
                "M4.13398 0.5C4.51888 -0.166667 5.48113 -0.166667 5.86603 0.5L9.33013 6.5C9.71503 7.16667 9.2339 8 8.4641 8L1.5359 8C0.766099 8 0.284973 7.16667 0.669873 6.5L4.13398 0.5Z"
              }
              style={getArrowStyles(context.placement)}
            />
            {props.title}
          </s.TooltipContainer>
        </FloatingPortal>
      )}
    </>
  );
};
