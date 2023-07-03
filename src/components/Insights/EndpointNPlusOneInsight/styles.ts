import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

export const SpanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Span = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
`;

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
  gap: 4px;
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

export const Button = styled(CommonButton)`
  margin-left: auto;
`;
