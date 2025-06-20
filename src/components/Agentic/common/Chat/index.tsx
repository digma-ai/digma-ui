import { useState } from "react";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { useAutoScroll } from "../../IncidentDetails/useAutoScroll";
import { PromptInput } from "../PromptInput";
import * as s from "./styles";
import type { ChatProps } from "./types";

export const Chat = ({
  isInitialLoading,
  isMessageSending,
  onMessageSend,
  chatContent,
  className,
  attachmentsComponent,
  promptFontSize
}: ChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const { elementRef, handleElementScroll, scrollToBottom } =
    useAutoScroll<HTMLDivElement>();

  const handleInputSubmit = () => {
    setInputValue("");
    scrollToBottom();
    onMessageSend(inputValue);
  };

  return (
    <s.Container className={className}>
      <s.ChatHistory ref={elementRef} onScroll={handleElementScroll}>
        {isInitialLoading && (
          <s.LoadingContainer>
            <Spinner size={32} />
          </s.LoadingContainer>
        )}
        {chatContent}
        {isMessageSending && <ThreeCirclesSpinner />}
      </s.ChatHistory>
      <PromptInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleInputSubmit}
        isSubmitting={isMessageSending}
        placeholder={"Write your prompt here"}
        fontSize={promptFontSize}
        attachmentsComponent={attachmentsComponent}
      />
    </s.Container>
  );
};
