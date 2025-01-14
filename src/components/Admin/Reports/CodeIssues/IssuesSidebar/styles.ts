import styled from "styled-components";
import {
  bodyBoldTypography,
  caption1RegularTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${({ theme }) =>
    `linear-gradient(0deg, ${theme.colors.v3.surface.primary} 0%, ${theme.colors.v3.surface.primary} 100%), #fff`};
  display: flex;
  flex-direction: column;
  width: 382px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 0 0 8px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDarkest};
`;

export const HeaderTitleRow = styled.div`
  ${bodyBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding: 16px;
`;

export const Footer = styled.div`
  ${caption1RegularTypography}
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 8px;
  gap: 8px;
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
