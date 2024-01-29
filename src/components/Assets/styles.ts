import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
`;

export const Header = styled.div`
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  flex-shrink: 0;
  height: 36px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;
