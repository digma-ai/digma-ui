import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import { useFormDataRequest } from "../../../../../hooks/useFormDataRequest";
import type { MCPServerIcon } from "../../../../../redux/services/types";
import { isString } from "../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { roundTo } from "../../../../../utils/roundTo";
import { DownloadIcon } from "../../../../common/icons/12px/DownloadIcon";
import { TrashBinIcon } from "../../../../common/icons/16px/TrashBinIcon";
import { PageIcon } from "../../../../common/icons/32px/PageIcon";
import { Direction } from "../../../../common/icons/types";
import { NewButton } from "../../../../common/v3/NewButton";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { SearchInput } from "../../../common/SearchInput";
import { trackingEvents } from "../../../tracking";
import { Footer } from "../Footer";
import * as s from "./styles";
import type { ToolsStepProps } from "./types";

const MAX_ICON_FILE_SIZE = 1024 * 1024; // in bytes
const MAX_ICON_WIDTH = 500; // in pixels
const MAX_ICON_HEIGHT = 500; // in pixels

export const ToolsStep = ({
  onCancel,
  onSave,
  tools,
  selectedTools: initialSelectedTools = [],
  isLoading,
  instructions = "",
  icon,
  error
}: ToolsStepProps) => {
  const [instructionsTextAreaValue, setInstructionsTextAreaValue] =
    useState(instructions);
  const [selectedTools, setSelectedTools] = useState(initialSelectedTools);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [dropzoneError, setDropzoneError] = useState<string>();
  const [iconId, setIconId] = useState<string | null>(icon?.id ?? null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const {
    send: upload,
    progress,
    isSending,
    abort
  } = useFormDataRequest<MCPServerIcon>({
    url: `${
      isString(window.digmaApiProxyPrefix)
        ? window.digmaApiProxyPrefix
        : "/api/"
    }/Agentic/mcp/icon`,
    onSuccess: (response) => {
      setIconId(response.id);
      setDropzoneError(undefined);
    },
    onError: (error) => {
      const errorMessage = axios.isAxiosError(error)
        ? error.response
          ? String(error.response.data)
          : error.message
        : error instanceof Error
          ? error.message
          : "Unknown error";
      setDropzoneError(`Failed to upload icon: ${errorMessage}`);
    }
  });

  const fileDetails =
    iconId && icon?.id === iconId
      ? {
          name: icon.fileName,
          size: icon.fileSize,
          type: icon.fileName.split(".")[1] ?? ""
        }
      : fileToUpload
        ? {
            name: fileToUpload.name,
            size: fileToUpload.size,
            type: fileToUpload.type.split("/")[1]
          }
        : null;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"]
    },
    disabled: Boolean(fileDetails),
    multiple: false,
    maxSize: MAX_ICON_FILE_SIZE,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some((error) => error.code === "too-many-files")) {
          setDropzoneError("Too many files. Only one file is allowed.");
          return;
        }

        if (
          rejection.errors.some((error) => error.code === "file-invalid-type")
        ) {
          setDropzoneError("Invalid file type. Only JPG and PNG are allowed.");
          return;
        }

        if (rejection.errors.some((error) => error.code === "file-too-large")) {
          setDropzoneError("File too large. Maximum size is 1MB.");
        }
      } else {
        setDropzoneError(undefined);

        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          const image = new Image();

          image.onload = () => {
            if (
              image.width > MAX_ICON_WIDTH ||
              image.height > MAX_ICON_HEIGHT
            ) {
              setDropzoneError(
                `Image dimensions should not exceed ${MAX_ICON_WIDTH}x${MAX_ICON_HEIGHT}px.`
              );
              return;
            }

            setFileToUpload(file);
            const formData = new FormData();
            formData.append("icon_image", file);

            void upload(formData);
          };

          image.src = window.URL.createObjectURL(file);
        }
      }
    }
  });

  const handleInstructionsTextAreaChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInstructionsTextAreaValue(e.target.value);
  };

  const handleSaveButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INCIDENT_TEMPLATE_EDIT_MCP_DIALOG_SAVE_BUTTON_CLICKED
    );
    onSave(selectedTools, instructionsTextAreaValue, iconId);
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

  const isSaveButtonEnabled =
    selectedTools.length > 0 && !isLoading && !isSending;

  const handleRemoveFile = () => {
    if (isSending) {
      abort();
    }
    setFileToUpload(null);
    setIconId(null);
    setDropzoneError(undefined);
  };

  const formattedFileSize = fileDetails
    ? fileDetails.size >= MAX_ICON_FILE_SIZE
      ? `${roundTo(fileDetails.size / 1024 / 1024, 0)} MB`
      : `${roundTo(fileDetails.size / 1024, 0)} KB`
    : "";

  const footerError = dropzoneError ?? error;

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
      <s.InstructionsTextArea
        value={instructionsTextAreaValue}
        onChange={handleInstructionsTextAreaChange}
        placeholder={
          "Describe any specific instructions on how this MCP should be used"
        }
      />
      <s.DropzoneContainer
        {...getRootProps()}
        $isDragActive={isDragActive}
        $isDisabled={Boolean(fileDetails)}
      >
        <input {...getInputProps()} />
        <s.DropzoneContent $isDragActive={isDragActive}>
          {fileDetails ? (
            <>
              <s.FileIconContainer>
                <PageIcon color={"currentColor"} />
                <s.FileExtension>{fileDetails.type}</s.FileExtension>
              </s.FileIconContainer>
              <s.DropzoneContentTextContainer>
                <Tooltip title={fileDetails.name}>
                  <s.FileName>{fileDetails.name}</s.FileName>
                </Tooltip>
                <s.FileDetails>
                  {formattedFileSize}{" "}
                  {isSending || progress > 0 ? `– ${progress}% uploaded` : ""}
                </s.FileDetails>
              </s.DropzoneContentTextContainer>
              {fileDetails && (
                <Tooltip title={"Remove icon"}>
                  <s.RemoveIconButton
                    icon={TrashBinIcon}
                    onClick={handleRemoveFile}
                    buttonType={"secondary"}
                  />
                </Tooltip>
              )}
            </>
          ) : (
            <>
              <s.DownloadIconContainer $isDragActive={isDragActive}>
                <DownloadIcon
                  color={"currentColor"}
                  size={16}
                  direction={Direction.Up}
                />
              </s.DownloadIconContainer>
              <s.DropzoneContentTextContainer>
                <span>
                  <s.EmphasizedText>Click to upload logo</s.EmphasizedText> or
                  drag and drop
                </span>
                <span>PNG or JPG (max. 500x500px)</span>
              </s.DropzoneContentTextContainer>
            </>
          )}
        </s.DropzoneContent>
      </s.DropzoneContainer>
      <Footer
        isLoading={isLoading}
        errorMessage={footerError}
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
