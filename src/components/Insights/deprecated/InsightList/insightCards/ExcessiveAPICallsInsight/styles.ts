import styled from "styled-components";
import { Button as CommonButton } from "../../../../../common/Button";

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

export const Span = styled.div`
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

export const Button = styled(CommonButton)`
  height: fit-content;
`;
