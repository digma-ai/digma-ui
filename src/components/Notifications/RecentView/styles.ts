import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  height: 100%;
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

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 3px 0 0 11px;
  margin: -3px 0 0 -11px;
  overflow: auto;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
