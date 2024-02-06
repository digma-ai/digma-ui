import styled from "styled-components";
import { TabProps } from "./types";

export const Container = styled.div`
  width: 100%;
  height: 136px;
  display: flex;
  flex-direction: column;
`;

export const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const Tabs = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

export const Tab = styled.div<TabProps>`
  border: ${({ theme, $isSelected }) =>
    $isSelected ? `2px solid ${theme.colors.stroke.secondary}` : "none"};
`;
