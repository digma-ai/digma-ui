import { CrossIcon } from "../icons/12px/CrossIcon";
import { Button } from "../v3/Button";
import * as s from "./styles";
import { DeleteEnvironmentConfirmationProps } from "./types";

export const CancelConfirmation = (
  props: DeleteEnvironmentConfirmationProps
) => {
  const handleConfirmButtonClick = () => {
    props.onCancel();
  };

  const handleCancelButtonClick = () => {
    props.onClose();
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  return (
    <s.Container>
      <s.Header>
        <s.Title>{props.header}</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={12} />
        </s.CloseButton>
      </s.Header>
      <s.Description>{props.description}</s.Description>
      <s.ButtonsContainer>
        <Button
          buttonType={"primary"}
          label={"No, continue"}
          onClick={handleCancelButtonClick}
        />
        <s.CancelButton
          buttonType={"secondary"}
          label={props.cancelBtnText ?? "Yes, cancel"}
          onClick={handleConfirmButtonClick}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
