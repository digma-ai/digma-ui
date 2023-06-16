import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};
`;
