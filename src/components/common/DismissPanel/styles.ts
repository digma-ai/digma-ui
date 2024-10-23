import styled from "styled-components";
import { subscriptRegularTypography } from "../App/typographies";

export const DismissDialog = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 7px;
  align-items: center;
  margin: -7px;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  position: absolute;
  width: 100%;

  ${subscriptRegularTypography}
`;

export const DismissDialogActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
