import styled from "styled-components";
import { subscriptRegularTypography } from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Label = styled.div`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const AssetsCount = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
