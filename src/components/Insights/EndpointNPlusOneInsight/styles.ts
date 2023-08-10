import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

export const SpanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Span = styled.span`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SpanDetails = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
`;

export const SpanName = styled.span`
  font-weight: 500;
`;

export const Stats = styled.span`
  display: flex;
  gap: 24px;
`;

export const Stat = styled.span`
  display: flex;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Button = styled(CommonButton)`
  margin-left: auto;
`;
