import styled from "styled-components";
import { caption1RegularTypography } from "../../../../common/App/typographies";

export const SpanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Span = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;

export const SpanDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  overflow: hidden;
`;

export const SpanName = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Stats = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
`;

export const Stat = styled.span`
  display: flex;
  gap: 4px;
`;

export const CriticalityValue = styled.span`
  display: flex;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Description = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};

  ${caption1RegularTypography}
`;
