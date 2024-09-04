import styled from "styled-components";
import { footnoteRegularTypography } from "../../../common/App/typographies";
import { Link } from "../../../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow: auto;
  padding: 0 8px;
`;

export const EmptyStateDescription = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const TroubleshootingLink = styled(Link)`
  font-size: 14px;
  text-decoration: underline;
`;

export const HomeEmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding-top: 4px;
`;

export const EmptyDescriptionContainer = styled.div`
  flex-direction: column;
  display: flex;
  text-align: center;
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary}
`;
