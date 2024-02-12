import styled from "styled-components";
import { TabProps } from "./types";

export const Container = styled.div`
  width: 100%;
  height: 136px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
`;

export const KebabMenu = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
`;

export const Tabs = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

export const Tab = styled.div<TabProps>`
  cursor: pointer;
  border: ${({ theme, $isSelected }) =>
    $isSelected ? `2px solid ${theme.colors.stroke.secondary}` : "none"};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;
