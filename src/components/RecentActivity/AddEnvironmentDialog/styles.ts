import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  font-size: 14px;
  width: 302px;
  border-radius: 2px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 12%);
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CloseButton = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
