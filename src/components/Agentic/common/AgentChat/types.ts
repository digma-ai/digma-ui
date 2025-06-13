export interface AgentChatProps {
  incidentId?: string;
  agentId?: string;
  onMessageSend: (text: string) => void;
  isMessageSending: boolean;
  className?: string;
  promptFontSize?: number;
}
