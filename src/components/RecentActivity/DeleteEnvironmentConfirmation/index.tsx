import { Button } from "../../common/Button";
import { CrossIcon } from "../../common/icons/CrossIcon";
import * as s from "./styles";
import { DeleteEnvironmentConfirmationProps } from "./types";

export const DeleteEnvironmentConfirmation = (
  props: DeleteEnvironmentConfirmationProps
) => {
  const handleDeleteButtonClick = () => {
    props.onDelete();
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
        <s.Title>Delete environment</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
      </s.Header>
      <span>Are you sure that you want to delete this environment?</span>
      <s.ButtonsContainer>
        <Button buttonType={"secondary"} onClick={handleCancelButtonClick}>
          Cancel
        </Button>
        <Button onClick={handleDeleteButtonClick}>Delete</Button>
      </s.ButtonsContainer>
    </s.Container>
  );
};
