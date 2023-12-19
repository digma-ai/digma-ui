import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#c6c6c6";
    }
  }};
`;
