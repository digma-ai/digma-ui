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
  word-break: break-all;
`;

export const EntityName = styled.span`
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
`;

export const Description = styled.span`
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
