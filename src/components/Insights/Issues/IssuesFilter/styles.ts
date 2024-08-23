import styled from "styled-components";
import { Select } from "../../../common/v3/Select";

export const MenuButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.stroke.primary};
  background: ${({ theme }) => theme.colors.surface.secondary};
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MenuButtonChevronIconContainer = styled.span`
  color: ${({ theme }) => theme.colors.icon.primary};
`;

export const InsightIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const StyledSelect = styled(Select)`
  background: ${({ theme }) => theme.colors.surface.brandDark};
`;
