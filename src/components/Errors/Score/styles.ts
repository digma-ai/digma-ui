import styled from "styled-components";
import { Tag } from "../../common/v3/Tag";

export const ScoreTagTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScoreTag = styled(Tag)`
  min-width: 24px;
  width: fit-content;
  flex-shrink: 0;
`;
