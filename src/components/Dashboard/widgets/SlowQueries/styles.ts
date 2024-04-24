import styled from "styled-components";
import { Link } from "../../../common/Link";
import { CopyButton } from "../../../common/v3/CopyButton";

export const StyledCopyButton = styled(CopyButton)`
  display: none;
  padding: 0;
`;

export const Entry = styled.div`
  display: flex;
  gap: 4px;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const SpanLink = styled(Link)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Duration = styled.span`
  margin-left: auto;
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
