import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { grayScale } from "../../../common/App/v2colors";
import { NewButton } from "../../../common/v3/NewButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 29%);
  font-size: 14px;
  color: ${grayScale[400]};
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 0 4px;
  display: flex;
  align-items: center;
  ${bodyBoldTypography}
`;

export const FilterCategoryName = styled.div`
  display: flex;
  padding: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  ${subscriptRegularTypography}
`;

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

export const Footer = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ClearAllButton = styled(NewButton)`
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
