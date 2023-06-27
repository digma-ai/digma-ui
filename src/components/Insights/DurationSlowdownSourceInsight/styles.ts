import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  line-height: 17px;
`;

export const Description = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#70787d";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const SourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Source = styled.span`
  display: flex;
  gap: 8px;
  font-weight: 500;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#49494d";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;
