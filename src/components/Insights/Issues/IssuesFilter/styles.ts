import styled from "styled-components";
import { NewButton } from "../../../common/v3/NewButton";
import { Select } from "../../../common/v3/Select";

export const Footer = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ClearAllButton = styled(NewButton)`
  padding: 0;

  span {
    color: ${({ theme }) => theme.colors.v3.status.high};
  }

  &:hover:enabled {
    color: ${({ theme }) => theme.colors.v3.status.high};

    span {
      color: ${({ theme }) => theme.colors.v3.status.high};
    }
  }
`;

export const InsightIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const StyledSelect = styled(Select)`
  background: ${({ theme }) => theme.colors.surface.brandDark};
`;
