import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: Alexandria;
`;

export const Header = styled.header`
  padding: 0 32px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 126px;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 88px 60px 0;
  gap: 32px;

  @media (width <= 375px) {
    padding: 88px 45px 0;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 1100px;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  margin: 0;
  font-size: 40px;
  font-weight: 500;

  @media (width <= 375px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;

  @media (width <= 375px) {
    font-size: 16px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 14px;
  line-height: 30px;
  opacity: 0.35;
  padding: 32px 68px;
  white-space: nowrap;
`;

export const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
`;
