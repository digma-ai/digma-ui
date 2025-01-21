import styled from "styled-components";
import {
  caption1BoldTypography,
  heading2BoldTypography,
  subheading1RegularTypography,
  subscriptRegularTypography
} from "../common/App/typographies";
import { Link } from "../common/v3/Link";
import { NewButton } from "../common/v3/NewButton";

export const Container = styled.div`
  background: radial-gradient(
      100% 100% at 50% 0%,
      rgb(124 144 248 / 20%) 0%,
      rgb(124 144 248 / 0%) 100%
    ),
    ${({ theme }) => theme.colors.v3.surface.secondary};
  height: 100%;
  padding: 0 20px;

  @media (width <= 375px) {
    padding: 0;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  text-align: center;
  max-width: 386px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  ${heading2BoldTypography}

  margin: 0;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Subtitle = styled.span`
  ${subheading1RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Form = styled.form`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignInButton = styled(NewButton)`
  width: 100%;
  justify-content: center;
`;

export const SignInSeparator = styled.div`
  ${caption1BoldTypography}

  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  text-transform: uppercase;
  gap: 8px;
`;

export const Divider = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
`;

export const Footer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FooterText = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  opacity: 0.5;
`;

export const TermsLink = styled(Link)`
  padding: 4px 8px;
  text-decoration: underline;
`;

export const ErrorText = styled.span`
  ${subscriptRegularTypography}

  height: 16px;
  color: ${({ theme }) => theme.colors.v3.status.high};
`;
