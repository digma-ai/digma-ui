import styled from "styled-components";

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-size: 14px;
`;

export const FooterItemsCount = styled.span`
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

export const FooterPageItemsCount = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
`;
