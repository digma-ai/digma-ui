import styled from "styled-components";
import { NewButton } from "../../NewButton";

export const InsightFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
