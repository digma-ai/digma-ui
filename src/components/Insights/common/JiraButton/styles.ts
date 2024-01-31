import styled from "styled-components";
import { Button } from "../../../common/Button";

export const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HintContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  padding: 8px;
`;

export const HintHeader = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.base};
  margin-bottom: 8px;
`;
