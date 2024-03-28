import styled from "styled-components";
import {
  subscriptMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Card as CommonCard } from "../../common/v3/Card";

export const Card = styled(CommonCard)`
  box-sizing: border-box;
  height: 140px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  height: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
`;

export const NoDataIconContainer = styled(IconContainer)`
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const LoadingDataIconContainer = styled(IconContainer)`
  background: ${({ theme }) => theme.colors.v3.status.backgroundLow};
  color: ${({ theme }) => theme.colors.v3.status.low};
`;

export const TextContainer = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Title = styled.span`
  ${subscriptMediumTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
