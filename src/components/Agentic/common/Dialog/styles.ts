import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 635px;
  height: 420px;
  padding: 12px;
  gap: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  ${/* TODO: change to typography from the theme*/ ""}
  font-size: 14px;
  font-weight: 600;
  width: 100%;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
`;
