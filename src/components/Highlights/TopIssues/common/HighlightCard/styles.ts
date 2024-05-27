import styled from "styled-components";
import { bodySemiboldTypography } from "../../../../common/App/typographies";

export const Header = styled.div`
  ${bodySemiboldTypography}

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InsightIconContainer = styled.div`
  display: flex;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const InfoContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
