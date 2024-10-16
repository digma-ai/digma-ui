import styled from "styled-components";
import { Select } from "../../../common/v3/Select";

export const StyledSelect = styled(Select)`
  background: ${({ theme }) => theme.colors.surface.brandDark};
`;

export const SelectItemIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;
