import { useState, type ChangeEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { NewButton } from "../../../../common/v3/NewButton";
import { SearchInput } from "../../../common/SearchInput";
import { trackingEvents } from "../../../tracking";
import { Footer } from "../Footer";
import * as s from "./styles";
import type { ToolsStepProps } from "./types";

export const ToolsStep = ({
  onCancel,
  onSave,
  tools,
  selectedTools: initialSelectedTools = [],
  isLoading,
  error
}: ToolsStepProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedTools, setSelectedTools] = useState(initialSelectedTools);
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleSaveButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_SAVE_BUTTON_CLICKED
    );
    onSave(selectedTools, textAreaValue);
  };

  const handleCancelButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_CANCEL_BUTTON_CLICKED
    );
    onCancel();
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInputValue(value);
  };

  const handleSelectAllToggleChange = (value: boolean) => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_SELECT_ALL_TOGGLE_CHANGED,
      { value }
    );
    setSelectedTools(value ? [...tools] : []);
  };

  const handleToolTagClick = (tool: string) => () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_TOOL_TAG_CLICKED
    );
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((x) => x !== tool) : [...prev, tool]
    );
  };

  const filteredTools = tools.filter((tool) =>
    tool.toLowerCase().includes(searchInputValue.toLowerCase())
  );
  const areAllSelected = tools.every((x) => selectedTools.includes(x));

  const isSaveButtonEnabled = selectedTools.length > 0 && !isLoading;

  return (
    <s.Container>
      <s.ToolsEditor>
        <s.ToolsEditorToolbar>
          Tools
          <SearchInput
            value={searchInputValue}
            onChange={handleSearchInputChange}
          />
          <s.SelectAllToggleSwitch
            label={"Select all"}
            labelPosition={"end"}
            checked={areAllSelected}
            onChange={handleSelectAllToggleChange}
          />
        </s.ToolsEditorToolbar>
        {filteredTools.length > 0 && (
          <s.ToolsList>
            {filteredTools.map((x) => (
              <s.ToolTag
                key={x}
                $isHighlighted={selectedTools.includes(x)}
                onClick={handleToolTagClick(x)}
              >
                {x}
              </s.ToolTag>
            ))}
          </s.ToolsList>
        )}
      </s.ToolsEditor>
      <s.TextArea
        value={textAreaValue}
        onChange={handleTextAreaChange}
        placeholder={
          "Describe any specific instructions on how this MCP should be used"
        }
      />
      <Footer
        isLoading={isLoading}
        errorMessage={error}
        loadingMessage={"Saving..."}
        buttons={
          <>
            <NewButton
              buttonType={"secondary"}
              label={"Cancel"}
              onClick={handleCancelButtonClick}
            />
            <NewButton
              label={"Save"}
              onClick={handleSaveButtonClick}
              isDisabled={!isSaveButtonEnabled}
            />
          </>
        }
      />
    </s.Container>
  );
};
