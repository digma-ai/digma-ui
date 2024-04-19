import styled from "styled-components";
import {
  bodyMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 12px 0 18px;
  gap: 12px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.span`
  ${bodyMediumTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary}
`;

export const Text = styled.span`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary}
`;

export const Background = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
