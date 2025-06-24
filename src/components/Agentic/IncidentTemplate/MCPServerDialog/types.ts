import type { MCPServerData } from "../../../../redux/services/types";

export interface MCPServerDialogProps {
  agentId: string;
  serverData?: MCPServerData;
  onClose: () => void;
  onComplete: () => void;
}
