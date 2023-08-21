import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 12px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CurrentPage = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;
