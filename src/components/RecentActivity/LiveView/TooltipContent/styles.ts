import styled from "styled-components";

export const Container = styled.div`
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;
