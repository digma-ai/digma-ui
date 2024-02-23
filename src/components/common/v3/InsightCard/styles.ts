import styled from "styled-components";
import { NewButton } from "../../NewButton";

export const InsightFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Description = styled.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const RefreshContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DismissButton = styled(NewButton)`
  &:hover {
    color: ${({ theme }) => theme.colors.v3.text.link};
  }

  font-size: 12px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MainActions = styled(Actions)`
  padding-left: 4px;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
