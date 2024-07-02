import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
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

export const IconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;
