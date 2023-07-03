import styled from "styled-components";

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

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 10px;
  line-height: normal;

  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const EndpointName = styled.span`
  display: flex;
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
  word-break: break-all;
`;

export const Duration = styled.span`
  margin-left: auto;
`;
