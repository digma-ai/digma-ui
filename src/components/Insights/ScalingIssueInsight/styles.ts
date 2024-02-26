import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

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
  gap: 8px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RootCause = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  gap: 4px;
`;

export const SpanName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Endpoint = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: fit-content;
`;

export const Button = styled(CommonButton)`
  height: fit-content;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
