import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Stats = styled.div`
  display: flex;
  border-radius: 4px;
  gap: 20px;
  justify-content: space-between;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

export const KeyContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Key = styled.span`
  font-size: 14px;
  font-weight: 510;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const IconContainer = styled.span`
  display: flex;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const TypicalLabel = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
