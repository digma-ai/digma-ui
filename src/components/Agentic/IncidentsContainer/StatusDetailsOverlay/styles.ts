import styled from "styled-components";
import { CodeSnippet } from "../../../common/CodeSnippet";
import { Overlay } from "../../../common/Overlay";
import { Dialog } from "../../common/Dialog";

export const StyledOverlay = styled(Overlay)`
  align-items: center;
`;

export const StyledDialog = styled(Dialog)`
  height: 437px;
`;

export const ErrorDetailsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  flex-grow: 1;
  overflow: auto;
`;

export const StyledCodeSnippet = styled(CodeSnippet)`
  flex-grow: 1;
  min-height: 200px;
  overflow: auto;
`;
