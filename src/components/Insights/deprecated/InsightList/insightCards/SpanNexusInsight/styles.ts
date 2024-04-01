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

export const Key = styled.span`
  font-size: 14px;
  font-weight: 510;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
