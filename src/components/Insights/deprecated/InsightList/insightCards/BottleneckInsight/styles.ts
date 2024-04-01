import styled from "styled-components";
import { Description as InsightDescription } from "../../../../styles";

export const EndpointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Endpoint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
`;

export const EndpointData = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const Description = styled(InsightDescription)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EndpointName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Duration = styled.span`
  display: flex;
  flex-shrink: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding-top: 12px;
`;

export const Box = styled.div`
  display: flex;
  gap: 8px;
`;
