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

export const ImpactScoreContainer = styled.div`
  margin-left: auto;
  display: flex;
  width: 70px;
  flex-shrink: 0;
`;
