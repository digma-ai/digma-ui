import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 0 12px;
  height: 36px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.tabPanel.background};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 5px 10px 0 rgb(0 0 0 / 15%)";
      case "dark":
      case "dark-jetbrains":
        return "0 9px 24px 0 rgb(0 0 0 / 30%)";
    }
  }};
`;

export const Divider = styled.div`
  margin: 0 8px;
  border-radius: 1px;
  width: 1px;
  height: 13px;
  background: ${({ theme }) => theme.colors.tabPanel.divider};
`;
