import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.colors.jiraTicket.border};
  background: ${({ theme }) => theme.colors.jiraTicket.background};
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 45%);
  padding: 12px;
  gap: 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  gap: 12px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.jiraTicket.text.secondary};
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.jiraTicket.text.primary};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
  margin-left: auto;
  height: fit-content;
  color: ${({ theme }) => theme.colors.jiraTicket.icon};
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const ButtonsContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
