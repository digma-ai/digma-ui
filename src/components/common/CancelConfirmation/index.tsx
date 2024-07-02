import { CrossIcon } from "../icons/12px/CrossIcon";
import { Button } from "../v3/Button";
import * as s from "./styles";
import { DeleteEnvironmentConfirmationProps } from "./types";

export const CancelConfirmation = ({
  onCancel,
  onClose,
  header,
  description,
  cancelBtnText
}: DeleteEnvironmentConfirmationProps) => {
  const handleConfirmButtonClick = () => {
    onCancel();
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
        <Button
          buttonType={"primary"}
          label={"No, continue"}
          onClick={handleCancelButtonClick}
        />
        <s.CancelButton
          buttonType={"secondary"}
          label={cancelBtnText ?? "Yes, cancel"}
          onClick={handleConfirmButtonClick}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
