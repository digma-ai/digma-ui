// Source: https://floating-ui.com/docs/popover#reusable-popover-component

import { PopoverContext, usePopover } from "./hooks";
import { PopoverProps } from "./types";

/** @deprecated */
export function Popover({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode;
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
