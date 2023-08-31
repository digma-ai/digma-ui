import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  font-size: 14px;
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
