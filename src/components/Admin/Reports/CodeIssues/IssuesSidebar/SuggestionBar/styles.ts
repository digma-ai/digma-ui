import styled from "styled-components";
import {
  bodyBoldTypography,
  bodyRegularTypography,
  caption1RegularTypography,
  subheading1SemiboldTypography,
  subscriptRegularTypography
} from "../../../../../common/App/typographies";
import { CodeSnippet as CommonCodeSnippet } from "../../../../../common/CodeSnippet";
import { Link } from "../../../../../common/v3/Link";
import { Spinner as CommonSpinner } from "../../../../../common/v3/Spinner";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  height: 100%;
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
`;

export const TitleContainer = styled.div`
  ${subheading1SemiboldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TitleIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const LoadingContainer = styled.div`
  border-radius: 8px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.v3.surface.brandDarkest};
`;

export const SpinnerContainer = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled(CommonSpinner)`
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  padding: 16px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SectionTitle = styled.span`
  ${caption1RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const RecommendationTitle = styled.span`
  ${bodyBoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const RecommendationDescription = styled.span`
  ${bodyRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const SourcesContainer = styled.div`
  ${bodyRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
`;

export const SourceLink = styled(Link)`
  ${subscriptRegularTypography}
  text-decoration: underline;
`;

export const AssetsContainer = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  height: 262px;
  box-sizing: border-box;
`;

export const CodeSnippet = styled(CommonCodeSnippet)`
  height: 100%;
`;

export const ActionItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
`;

export const ActionItem = styled.div`
  ${bodyBoldTypography}
  padding: 12px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Footer = styled.div`
  ${caption1RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;
