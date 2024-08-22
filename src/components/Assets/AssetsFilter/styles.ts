import styled from "styled-components";
import { grayScale } from "../../common/App/v2colors";

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
  color: ${({ theme }) => theme.colors.select.menu.text.primary};
  padding: 0 4px;
  display: flex;
  align-items: center;
`;

export const FilterCategoryName = styled.div`
  display: flex;
  padding: 4px;
  color: ${grayScale[400]};
`;

export const Footer = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
