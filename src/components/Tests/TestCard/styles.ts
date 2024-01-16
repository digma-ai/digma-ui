import styled from "styled-components";
import { Link } from "../../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface.card};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.primary};
  font-size: 14px;
`;

export const TestNameLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.link};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.base};
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke.primary};
  padding: 8px;
`;

export const Content = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  flex-wrap: wrap;
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  max-width: 150px;
  color: ${({ theme }) => theme.colors.text.subtext};
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.icon.disabledAlt};
`;

export const StatValue = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: auto;
  margin-top: auto;
`;
