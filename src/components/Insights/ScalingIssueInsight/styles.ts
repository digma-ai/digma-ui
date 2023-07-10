import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

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
  gap: 8px;
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
`;

export const Description = styled.span`
  font-weight: 400;
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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RootCause = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled(CommonButton)`
  height: fit-content;
`;
