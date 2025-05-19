import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../App/typographies";
import { NewButton } from "../v3/NewButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.v3.surface.brandDarkest};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 29%);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${bodyBoldTypography}
`;

export const Footer = styled.div`
  padding: 8px 0;
  display: flex;
  gap: 8px;
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

export const CloseButton = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
  color: inherit;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const FilterCategoryName = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  ${subscriptRegularTypography}
`;
