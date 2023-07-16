// Source: https://floating-ui.com/docs/popover#reusable-popover-component

import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs
} from "@floating-ui/react";
import { CSSProperties, ForwardedRef, HTMLProps, forwardRef } from "react";
import { usePopoverContext } from "../hooks";

const PopoverContentComponent = (
  { style, width, ...props }: HTMLProps<HTMLDivElement>,
  propRef: ForwardedRef<HTMLDivElement>
) => {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {context.open && (
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            ref={ref}
            style={
              {
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
                width:
                  width ||
                  context.elements.reference?.getBoundingClientRect().width,
                outline: "none",
                ...style
              } as CSSProperties
            }
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
};

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(PopoverContentComponent);
