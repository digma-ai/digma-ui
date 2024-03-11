import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

const Section = styled.div`
  padding: 8px;
`;

export const Content = Section;

export const Header = styled(Section)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
`;

export const Footer = styled(Section)`
  border-top: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
`;
