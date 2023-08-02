import styled from "styled-components";
import { Description as InsightDescription } from "../styles";

export const EndpointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Endpoint = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Description = styled(InsightDescription)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EndpointName = styled.span`
  display: flex;
  font-weight: 500;
  word-break: break-all;
`;

export const Duration = styled.span`
  margin-left: auto;
`;
