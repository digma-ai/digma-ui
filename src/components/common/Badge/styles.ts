import styled from "styled-components";

export const Outline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "rgba(224, 0, 54, 0.3)";
      case "dark":
        return "rgba(241, 76, 106, 0.4)";
    }
  }};
  box-shadow: 0px 0px 8px 0px rgba(76, 142, 241, 0.12);
  border-radius: 2px;
`;

export const Badge = styled.div`
  width: 4px;
  height: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
        return "#f93967";
    }
  }};
  box-shadow: 0px 0px 4px rgba(188, 6, 6, 0.5);
  border-radius: 1px;
`;
