import { useState, type ChangeEvent } from "react";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { NewButton } from "../../../common/v3/NewButton";
import * as s from "./styles";
import type { AddMCPServerDialogProps } from "./types";

export const AddMCPServerDialog = ({
  onClose,
  onSave
}: AddMCPServerDialogProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleSaveButtonClick = () => {
    onSave(textAreaValue);
    onClose();
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  return (
    <s.Container>
      <s.Header>
        <s.Header>
          Edit JSON
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} />
          </s.CloseButton>
        </s.Header>
      </s.Header>
      <s.TextArea value={textAreaValue} onChange={handleTextAreaChange} />
      <s.Footer>
        <NewButton
          buttonType={"secondary"}
          label={"Cancel"}
          onClick={handleCloseButtonClick}
        />
        <NewButton label={"Save"} onClick={handleSaveButtonClick} />
      </s.Footer>
    </s.Container>
  );
};
