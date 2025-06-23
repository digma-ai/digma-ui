import { CrossIcon } from "../icons/12px/CrossIcon";
import { NewButton } from "../v3/NewButton";
import * as s from "./styles";
import type { CancelConfirmationProps } from "./types";

export const CancelConfirmation = ({
  onConfirm,
  onClose,
  header,
  description,
  cancelBtnText = "Yes, cancel",
  confirmBtnText = "No, continue"
}: CancelConfirmationProps) => {
  const handleConfirmButtonClick = () => {
    onConfirm();
  };

  const handleCancelButtonClick = () => {
    onClose();
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  return (
    <s.Container>
      <s.Header>
        <s.Title>{header}</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={12} />
        </s.CloseButton>
      </s.Header>
      <s.Description>{description}</s.Description>
      <s.ButtonsContainer>
        <NewButton
          buttonType={"primary"}
          label={confirmBtnText}
          onClick={handleCancelButtonClick}
        />
        <s.CancelButton
          buttonType={"secondary"}
          label={cancelBtnText}
          onClick={handleConfirmButtonClick}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
