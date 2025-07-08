import styled from "styled-components";
import { Overlay } from "../../../common/Overlay";
import { AgentChat } from "../../common/AgentChat";
import { Dialog } from "../../common/Dialog";

export const StyledOverlay = styled(Overlay)`
  align-items: center;
`;

export const StyledDialog = styled(Dialog)`
  height: 437px;
`;

export const StyledAgentChat = styled(AgentChat)`
  ${/* TODO: change to color from the theme */ ""}
  background: #000;
  border-radius: 8px;
  padding: 24px;
  gap: 12px;
`;
