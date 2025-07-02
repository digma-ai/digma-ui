import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { ForwardedRef } from "react";
import { forwardRef, useCallback, useEffect } from "react";
import { useMount } from "../../../hooks/useMount";
import type { AutoAnimatedContainerProps } from "./types";

export const AutoAnimatedContainerComponent = (
  {
    children,
    isAnimationEnabled,
    animationOptions,
    className
  }: AutoAnimatedContainerProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [parent, enable] = useAutoAnimate<HTMLDivElement>(animationOptions);

  // Memoization is required to avoid React "Maximum update depth exceeded" error
  // More info: https://github.com/formkit/auto-animate/issues/166
  const getRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
      parent(element);
    },
    [parent, ref]
  );

  // TODO: replace with useEffect
  useMount(() => {
    enable(isAnimationEnabled);
  });

  useEffect(() => {
    enable(isAnimationEnabled);
  }, [enable, isAnimationEnabled]);

  return (
    <div className={className} ref={getRef}>
      {children}
    </div>
  );
};

export const AutoAnimatedContainer = forwardRef(AutoAnimatedContainerComponent);
