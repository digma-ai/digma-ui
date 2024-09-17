import styled from "styled-components";
import { bodyRegularTypography } from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: fit-content;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  padding: 24px;
  gap: 24px;
`;

export const Content = styled.div`
  padding: 32px;
  display: flex;
  gap: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border-radius: 12px;
  width: 100%;
`;

export const Footer = styled.div`
  padding: 0 16px;
  align-items: center;
  display: flex;
  justify-content: start;
  gap: 8px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.v3.text.disabled};
  ${bodyRegularTypography}
`;
