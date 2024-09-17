import styled from "styled-components";
import { bodyRegularTypography } from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: fit-content;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  padding: 24px;
  gap: 24px;
`;

export const Footer = styled.div`
  padding: 24px 32px 16px;
  align-items: center;
  display: flex;
  justify-content: start;
  gap: 8px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.v3.text.disabled};
  ${bodyRegularTypography}
`;

export const Section = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;
