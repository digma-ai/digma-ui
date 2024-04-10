import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { Button } from "../../../common/v3/Button";
import * as s from "./styles";
import { DeleteEnvironmentConfirmationProps } from "./types";

export const CancelConfirmation = (
  props: DeleteEnvironmentConfirmationProps
) => {
  const handleDeleteButtonClick = () => {
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
        <s.Title>Discard adding a new Environment?</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={12} />
        </s.CloseButton>
      </s.Header>
      <s.Description>
        Are you sure that you want to stop adding new environment?
      </s.Description>
      <s.ButtonsContainer>
        <Button
          buttonType="primary"
          label="No, continue"
          onClick={handleCancelButtonClick}
        />
        <s.CancelButton
          buttonType="secondary"
          label="Yes, cancel"
          onClick={handleDeleteButtonClick}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
