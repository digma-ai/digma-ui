import styled from "styled-components";
import { Tag as TagCommon } from "../Tag";

export const AsyncTag = styled(TagCommon)`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.asyncTag};
  font-size: 12px;
`;
