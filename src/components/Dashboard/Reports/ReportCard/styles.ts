import styled from "styled-components";
import { Card } from "../../../common/v3/Card";

export const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  border-radius: 8px;
`;
