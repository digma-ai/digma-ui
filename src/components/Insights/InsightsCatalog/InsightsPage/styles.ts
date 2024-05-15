import styled from "styled-components";
import { FadingContentSwitch } from "../../../common/FadingContentSwitch";
import { Link } from "../../../common/Link";

export const Container = styled.div`
  height: 100%;
`;

export const StyledFadingContentSwitch = styled(FadingContentSwitch)`
  height: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow: auto;
  padding: 0 8px;
`;

export const EmptyStateDescription = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#7c7c94";
    }
  }};
`;

export const TroubleshootingLink = styled(Link)`
  font-size: 14px;
  text-decoration: underline;
`;
