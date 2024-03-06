import styled from "styled-components";
import { bodyMediumTypography } from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SpanInfoRow = styled.div`
  display: flex;
  padding: 0 32px;
`;

export const TagTitle = styled.span`
  white-space: pre;
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const Label = styled.div`
  ${bodyMediumTypography}

  display: flex;
  gap: 4px;
  align-items: center;
`;

export const BadgeContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
`;

export const WarningTriangleContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.status.high};
`;
