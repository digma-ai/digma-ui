import styled from "styled-components";
import { caption1RegularTypography } from "../../App/typographies";

export const Container = styled.div`
  ${caption1RegularTypography}

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DescriptionContainer = styled.div`
  gap: 8px;
  display: flex;
  margin-right: auto;
  align-items: center;
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

export const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.icon.primary};

  &:disabled {
    cursor: initial;
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;

export const PageCounter = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const CurrentPage = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
