import styled from "styled-components";
import { grayScale } from "../../common/App/getTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${"#2c2e33" /* TODO: use theme*/};
  box-shadow: 0 2px 4px 0 rgba(0 0 0 / 29%);
  font-size: 14px;
  color: ${grayScale[400]};
`;

export const Header = styled.div`
  font-size: 16px;
  color: ${"#fff" /* TODO: use theme*/};
  padding: 0 4px;
  height: 24px;
  display: flex;
  align-items: center;
`;

export const MenuButton = styled.button`
  border: 1px solid ${"#A1B5FF" /* TODO: use theme*/};
  background: ${"#1E1F22" /* TODO: use theme*/};
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MenuButtonChevronIconContainer = styled.span`
  color: ${"#D3D6E5" /* TODO: use theme*/};
`;

export const Footer = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
