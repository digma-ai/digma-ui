// Source: https://floating-ui.com/docs/popover#reusable-popover-component

import type { ReactNode } from "react";
import { PopoverContext, usePopover } from "./hooks";
import type { PopoverProps } from "./types";

/** @deprecated */
export function Popover({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode;
} & PopoverProps) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}
