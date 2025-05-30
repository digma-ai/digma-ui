import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStableSearchParams } from "../../../../hooks/useStableSearchParams";
import {
  useGetIncidentAgentChatEventsQuery,
  useSendMessageToIncidentAgentChatMutation
} from "../../../../redux/services/digma";
import type { IncidentAgentChatEvent } from "../../../../redux/services/types";
import { ThreeCirclesSpinner } from "../../../common/ThreeCirclesSpinner";
import { Spinner } from "../../../common/v3/Spinner";
import { Accordion } from "../AgentEvents/Accordion";
import { TypingMarkdown } from "../TypingMarkdown";
import { convertToMarkdown } from "../utils/convertToMarkdown";
import { PromptInput } from "./PromptInput";
import * as s from "./styles";

export const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const params = useParams();
  const incidentId = params.id;
  const [searchParams] = useStableSearchParams();
  const agentId = searchParams.get("agent");
  const [sendMessageToBeSent, setSendMessageToBeSent] = useState<string>();

  const { data, isLoading } = useGetIncidentAgentChatEventsQuery(
    {
      incidentId: incidentId ?? "",
      agentId: agentId ?? ""
    },
    {
      skip: !incidentId || !agentId
    }
  );

  const [sendMessage, { isLoading: isMessageSending }] =
    useSendMessageToIncidentAgentChatMutation();

  const handleInputSubmit = () => {
    setInputValue("");
    setSendMessageToBeSent(inputValue);
    void sendMessage({
      incidentId: incidentId ?? "",
      agentId: agentId ?? "",
      data: { text: inputValue }
    }).finally(() => {
      setSendMessageToBeSent(undefined);
    });
  };

  useEffect(() => {
    setInputValue("");
  }, [agentId]);

  const renderChatEvent = (event: IncidentAgentChatEvent) => {
    switch (event.type) {
      case "tool":
        return (
          <Accordion
            summary={"MCP tool"}
            content={<TypingMarkdown text={convertToMarkdown(event.message)} />}
          />
        );
      case "human":
        return <s.HumanMessage>{event.message}</s.HumanMessage>;
      case "ai":
      default:
        return <TypingMarkdown text={event.message} />;
    }
  };

  return (
    <s.Container>
      <s.ChatHistory>
        {!data && isLoading && (
          <s.LoadingContainer>
            <Spinner size={32} />
          </s.LoadingContainer>
        )}
        {data?.map((x, i) => (
          <Fragment key={i}>{renderChatEvent(x)}</Fragment>
        ))}
        {sendMessageToBeSent && (
          <s.HumanMessage>{sendMessageToBeSent}</s.HumanMessage>
        )}
        {isMessageSending && <ThreeCirclesSpinner />}
      </s.ChatHistory>
      <PromptInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleInputSubmit}
        isSubmitting={isMessageSending}
      />
    </s.Container>
  );
};
