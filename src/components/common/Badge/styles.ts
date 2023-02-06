import styled from "styled-components";
import theme from "styled-theming";

export const Container = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  background: ${theme("mode", {
    light: "rgba(224, 0, 54, 0.3)",
    dark: "rgba(241, 76, 106, 0.4)"
  })};
  box-shadow: 0px 0px 8px 0px rgba(76, 142, 241, 0.12);
  border-radius: 2px;
`;

export const Badge = styled.div`
  width: 4px;
  height: 4px;
  background: ${theme("mode", {
    light: "#e00036",
    dark: "#f93967"
  })};

  box-shadow: 0px 0px 4px rgba(188, 6, 6, 0.5);
  border-radius: 1px;
`;
