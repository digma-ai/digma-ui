import type { AutoAnimateOptions } from "@formkit/auto-animate";
import type { ReactNode } from "react";

export interface AutoAnimatedContainerProps {
  isAnimationEnabled: boolean;
  children: ReactNode;
  animationOptions?: Partial<AutoAnimateOptions>;
  className?: string;
}
