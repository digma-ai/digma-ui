import styled from "styled-components";
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
  gap: 4px;
  padding: 12px;
`;
