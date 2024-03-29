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

export const ImpactScoreContainer = styled.div`
  display: flex;
  width: 70px;
  flex-shrink: 0;
`;
