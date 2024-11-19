import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  display: flex;
  flex-direction: column;
  min-height: 100%;
  font-family: Alexandria, sans-serif;
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
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 820px;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 40px;
  font-weight: 500;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;
`;

export const SelectContainer = styled.div`
  width: 228px;
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
`;

export const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
`;
