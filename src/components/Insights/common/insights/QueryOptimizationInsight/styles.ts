import styled from "styled-components";

export const Stats = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
`;

export const Stat = styled.span`
  display: flex;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#49494d";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const SpanContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CriticalityValue = styled.span`
  display: flex;
  gap: 4px;
`;

export const EndpointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Endpoint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
