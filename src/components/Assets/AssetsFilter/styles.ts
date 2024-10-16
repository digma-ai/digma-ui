import styled from "styled-components";
import { Select } from "../../common/v3/Select";

export const StyledSelect = styled(Select)`
  background: ${({ theme }) => theme.colors.surface.brandDark};
`;
