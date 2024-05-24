import styled from "styled-components";
import { Stat } from "../styles";

export const StatSkeleton = styled(Stat)`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;
