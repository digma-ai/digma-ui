import styled from "styled-components";
import { Card } from "../../../common/v3/Card";
import { Header } from "../../../common/v3/Card/styles";

export const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  border-radius: 8px;

  ${Header} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
    margin-bottom: 8px;
  }
`;
