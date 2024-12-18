import styled from "styled-components";
import { Spinner as CommonSpinner } from "../../../../common/v3/Spinner";

export const Spinner = styled(CommonSpinner)`
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;
