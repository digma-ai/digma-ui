// Source: https://floating-ui.com/docs/popover#reusable-popover-component

import { useMergeRefs } from "@floating-ui/react";
import {
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLProps,
  isValidElement,
  Ref
} from "react";
import { usePopoverContext } from "../hooks";
import { PopoverTriggerProps } from "./types";

const PopoverTriggerComponent = (
  {
    children,
    asChild = false,
    ...props
  }: HTMLProps<HTMLElement> & PopoverTriggerProps,
  propRef: ForwardedRef<HTMLElement>
) => {
  const context = usePopoverContext();
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const childrenRef: Ref<unknown> = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      // TODO: fix types
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed"
      })
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
};

export const PopoverTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(PopoverTriggerComponent);
