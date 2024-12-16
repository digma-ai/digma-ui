import type { Placement } from "@floating-ui/react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions
} from "@floating-ui/react";
import { Children, cloneElement, useRef, useState } from "react";
import type { DefaultTheme } from "styled-components";
import { useTheme } from "styled-components";
import { isNumber } from "../../../typeGuards/isNumber";
import { LAYERS } from "../App/styles";
import type { PopoverProps } from "./types";

// in pixels
const ARROW_MARGIN = -3;
const ARROW_HEIGHT = 8;
const ARROW_GAP = 1;
const GAP = 6;

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

const getArrowColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#fbfdff";
    case "dark":
    case "dark-jetbrains":
      return "#2e2e2e";
  }
};

export const NewPopover = ({
  placement = "top",
  isOpen,
  onOpenChange,
  arrow: showArrow,
  boundary,
  useClickInteraction,
  children,
  sameWidth,
  width,
  content,
  closeOnOutsidePress,
  useShift
}: PopoverProps) => {
  const [minWidth, setMinWidth] = useState<number | string | undefined>();
  const [maxWidth, setMaxWidth] = useState<number | string | undefined>();

  const arrowRef = useRef(null);
  const theme = useTheme();
  const arrowColor = getArrowColor(theme);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: onOpenChange,
    middleware: [
      offset(showArrow ? ARROW_HEIGHT + ARROW_GAP : GAP),
      size({
        apply({ rects, availableWidth }) {
          if (sameWidth) {
            setMinWidth(rects.reference.width);
            setMaxWidth(rects.reference.width);
          } else {
            const safeAvailableWidth = Math.max(availableWidth, 0);
            const viewportWidth = window.innerWidth;
            const anchorLeft = rects.reference.x;

            const minWidth = width;
            const maxWidth =
              useShift === false
                ? Math.max(viewportWidth - anchorLeft, 0)
                : width;

            setMinWidth(
              isNumber(minWidth)
                ? Math.min(minWidth, safeAvailableWidth)
                : minWidth
            );
            setMaxWidth(
              isNumber(maxWidth)
                ? Math.min(maxWidth, safeAvailableWidth)
                : maxWidth
            );
          }
        }
      }),
      flip(),
      ...(useShift === false
        ? []
        : [
            shift({
              boundary
            })
          ]),
      ...(showArrow
        ? [
            arrow({
              element: arrowRef
            })
          ]
        : [])
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePress: closeOnOutsidePress
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    ...(useClickInteraction === false ? [] : [click]),
    dismiss
  ]);

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, {
          ref: refs.setReference,
          ...getReferenceProps()
        })
      )}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              minWidth,
              maxWidth,
              zIndex: LAYERS.MODAL
            }}
            {...getFloatingProps()}
          >
            {showArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={arrowColor}
                width={10}
                height={8}
                d={
                  "M4.13398 0.5C4.51888 -0.166667 5.48113 -0.166667 5.86603 0.5L9.33013 6.5C9.71503 7.16667 9.2339 8 8.4641 8L1.5359 8C0.766099 8 0.284973 7.16667 0.669873 6.5L4.13398 0.5Z"
                }
                style={getArrowStyles(context.placement)}
              />
            )}
            <div>{content}</div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
