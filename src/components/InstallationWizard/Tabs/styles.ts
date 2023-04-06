import styled from "styled-components";
import { TabProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TabList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #2e2e2e;
`;

export const Tab = styled.li<TabProps>`
  box-sizing: border-box;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  padding: 9px 10px;
  display: flex;
  gap: 4px;
  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};

  border-bottom: ${({ isSelected }) =>
    isSelected ? "3px solid #5154ec" : "none"};

  color: ${({ isSelected }) => (isSelected ? "#dadada" : "#9b9b9b")};

  &:hover {
    color: #dadada;
  }
`;
