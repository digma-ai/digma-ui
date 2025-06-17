import { useState, type ChangeEvent, type MouseEvent } from "react";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { CrossIcon } from "../../../../common/icons/12px/CrossIcon";
import { NewButton } from "../../../../common/v3/NewButton";
import { SearchInput } from "../../../common/SearchInput";
import { trackingEvents } from "../../../tracking";
import * as s from "./styles";
import type { ToolsStepProps } from "./types";

const initialTools = [
  "create_issue",
  "list_issues",
  "update_issue",
  "list_commits",
  "get_me",
  "search_users",
  "list_secret_scanning_alerts",
  "push_files",
  "get_file_contents",
  "get_commit",
  "fork_repository"
];

export const ToolsStep = ({ onCancel, onSave }: ToolsStepProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [tools, setTools] = useState(initialTools);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
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

  const handleToolTagDeleteButtonClick =
    (tool: string) => (e: MouseEvent<HTMLButtonElement>) => {
      sendUserActionTrackingEvent(
        trackingEvents.INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_TOOL_TAG_DELETE_BUTTON_CLICKED
      );

      e.stopPropagation();

      setTools((prev) => prev.filter((x) => x !== tool));
    };

  const filteredTools = tools.filter((tool) =>
    tool.toLowerCase().includes(searchInputValue.toLowerCase())
  );
  const areAllSelected = tools.every((x) => selectedTools.includes(x));

  const isSaveButtonEnabled = selectedTools.length > 0;

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
                <s.ToolTagDeleteButton
                  onClick={handleToolTagDeleteButtonClick(x)}
                  $isHighlighted={selectedTools.includes(x)}
                >
                  <CrossIcon color={"currentColor"} />
                </s.ToolTagDeleteButton>
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
      <s.Footer>
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
      </s.Footer>
    </s.Container>
  );
};
