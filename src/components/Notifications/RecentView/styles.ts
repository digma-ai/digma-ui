import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  height: 100%;
  flex-grow: 1;
`;

export const Subtitle = styled.span`
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: flex-end;
`;
