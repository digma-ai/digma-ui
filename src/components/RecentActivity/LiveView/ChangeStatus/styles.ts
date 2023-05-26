import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  gap: 4px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#e2e7ff";
    }
  }};

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#d0d6eb";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;
