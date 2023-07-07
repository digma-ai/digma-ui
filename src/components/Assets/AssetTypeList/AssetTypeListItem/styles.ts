import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 4px;
  padding: 8px 12px 8px 8px;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: -0.1px;
  user-select: none;
  border-radius: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;

export const EntryCount = styled.span`
  margin-left: auto;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;
