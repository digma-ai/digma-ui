import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ErrorList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  gap: 4px;
`;

export const Source = styled.span`
  word-break: break-all;
`;

export const Error = styled(Source)`
  font-weight: 500;
`;
