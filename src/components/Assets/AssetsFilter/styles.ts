import styled from "styled-components";
import { FilterPopup } from "../../common/FilterPopup";
import { Select } from "../../common/v3/Select";

export const StyledSelect = styled(Select)`
  background: ${({ theme }) => theme.colors.surface.brandDark};
`;

export const StyledFilterPopup = styled(FilterPopup)`
  margin: 0 8px;
`;
