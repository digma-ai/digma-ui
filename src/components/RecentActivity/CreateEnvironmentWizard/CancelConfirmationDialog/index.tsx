import { CancelConfirmation } from "../../../common/CancelConfirmation";
import type { CancelConfirmationDialogProps } from "./types";

export const CancelConfirmationDialog = ({
  onConfirm,
  onClose
}: CancelConfirmationDialogProps) => (
  <CancelConfirmation
    header={"Discard adding a new Environment?"}
    description={"Are you sure that you want to stop adding new environment?"}
    confirmBtnText={"Yes, discard"}
    onClose={onClose}
    onConfirm={onConfirm}
  />
);
