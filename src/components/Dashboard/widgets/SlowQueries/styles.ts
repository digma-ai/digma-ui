import styled from "styled-components";
import { Link } from "../../../common/Link";

export const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

export const SpanLink = styled(Link)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Duration = styled.span`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;
