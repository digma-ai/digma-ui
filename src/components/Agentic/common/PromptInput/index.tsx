import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent
} from "react";
import { RoundedTriangleIcon } from "../../../common/icons/12px/RoundedTriangleIcon";
import { Direction } from "../../../common/icons/types";
import * as s from "./styles";
import type { PromptInputProps } from "./types";

export const PromptInput = ({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  className,
  placeholder,
  isDisabled,
  fontSize = s.TEXT_AREA_DEFAULT_FONT_SIZE,
  attachmentsComponent
}: PromptInputProps) => {
  const isSubmittingDisabled = Boolean(isSubmitting ?? value.trim() === "");
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<number>(
    s.TEXT_AREA_MIN_HEIGHT
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmittingDisabled) {
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.metaKey) {
        // Ctrl+Enter or Cmd+Enter: insert new line
        e.preventDefault();
        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd } = textarea;
        const newValue =
          value.slice(0, selectionStart) + "\n" + value.slice(selectionEnd);
        onChange(newValue);

        // Restore cursor position after the inserted newline
        setTimeout(() => {
          textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
        }, 0);
      } else {
        // Enter: submit form
        e.preventDefault();
        if (!isSubmittingDisabled) {
          onSubmit();
        }
      }
    }
  };

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (textArea) {
      const MAX_LINES = 3;
      const linesCount = value.split("\n").length;
      const lineHeight = fontSize * s.TEXT_AREA_LINE_HEIGHT;
      const newLinesHeight = Math.min(
        lineHeight * linesCount,
        lineHeight * MAX_LINES
      );

      setTextAreaHeight(Math.max(newLinesHeight, s.TEXT_AREA_MIN_HEIGHT));
    }
  }, [value, fontSize]);

  const formHeight = textAreaHeight + s.FORM_TOP_BOTTOM_PADDING * 2;

  return (
    <s.Form
      ref={formRef}
      onSubmit={handleSubmit}
      $height={formHeight}
      className={className}
    >
      <s.TextAreaContainer>
        {attachmentsComponent}
        <s.TextArea
          $height={textAreaHeight}
          $fontSize={fontSize}
          ref={textAreaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
        />
      </s.TextAreaContainer>
      <s.SubmitButton type={"submit"} disabled={isSubmittingDisabled}>
        <RoundedTriangleIcon
          color={"currentColor"}
          direction={Direction.Right}
        />
      </s.SubmitButton>
    </s.Form>
  );
};
