import styled from "styled-components";
import { subscriptRegularTypography } from "../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 8px;
  height: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const SectionHeader = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
