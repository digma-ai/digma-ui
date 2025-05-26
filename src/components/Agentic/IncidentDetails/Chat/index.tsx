import { useEffect, useState } from "react";
import { useAgenticSelector } from "../../../../containers/Agentic/hooks";
import { PromptInput } from "./PromptInput";
import * as s from "./styles";

export const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const agentId = useAgenticSelector((state) => state.incidents.agentId);

  const handleInputSubmit = () => {
    setInputValue("");
  };

  useEffect(() => {
    setInputValue("");
  }, [agentId]);

  return (
    <s.Container>
      <s.ChatHistory></s.ChatHistory>
      <PromptInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleInputSubmit}
      />
    </s.Container>
  );
};
