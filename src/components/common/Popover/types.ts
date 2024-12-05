import { Placement } from "@floating-ui/react";
import { Dispatch, SetStateAction } from "react";
import { usePopover } from "./hooks";

export type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export interface PopoverProps {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
