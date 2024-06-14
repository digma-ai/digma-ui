import styled from "styled-components";
import { LAYERS } from "../common/App/styles";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const NoDataContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.subtext};
  font-size: 14px;
`;

export const EnvironmentFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.subtext};
  font-size: 14px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px 12px;
  gap: 12px;
  overflow: auto;
`;

export const TestsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 12px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

export const ItemsCount = styled.span`
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const PageItemsCount = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  margin: auto;
  background: rgb(18 18 21 / 70%);
  z-index: ${LAYERS.OVERLAY};
  overflow: auto;
`;

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 16px 4%;
  overflow: hidden;
  box-sizing: border-box;
`;
