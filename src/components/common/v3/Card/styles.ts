import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { darkTheme } from "../../App/themes/darkTheme";
import { lightTheme } from "../../App/themes/lightTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  font-size: 14px;
`;

export const Content = styled.div`
  padding: 8px;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  padding: 8px;
`;

export const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  padding: 8px;
`;
