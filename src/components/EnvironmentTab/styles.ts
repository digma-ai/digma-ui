import styled from "styled-components";
import theme from "styled-theming";
import { ContainerProps } from "./types";

const BORDER_RADIUS = 8; // in pixels

export const BorderContainer = styled.div<ContainerProps>`
  padding: 1px;
  border-radius: ${BORDER_RADIUS}px;
  display: inline-block;
  margin-right: 4px;
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.isSelected
      ? `
    background: ${theme("mode", {
      light: "linear-gradient(125.97deg, #D5E4FF 17.33%, #E4EEFF 85.67%)",
      dark: "linear-gradient(109.83deg, #3a3d41 0.01%, rgba(0, 0, 0, 0) 102.21%)"
    })(props)};
     

    box-shadow: 2px 2px 7px rgba(0, 0, 0, ${theme("mode", {
      light: "0.07",
      dark: "0.3"
    })(props)});
  `
      : ``};
`;

export const Container = styled.button<ContainerProps>`
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 12px;
  color: ${({ isSelected }) =>
    isSelected
      ? theme("mode", {
          light: "#002d61",
          dark: "#b9C2eb"
        })
      : theme("mode", {
          light: "#4d668a",
          dark: "#7c7c94"
        })};
  border-radius: ${BORDER_RADIUS}px;
  height: 26px;
  border: none;
  background: ${({ isSelected }) =>
    isSelected
      ? theme("mode", {
          light: "#fbfdff",
          dark: "#1e1e1e"
        })
      : "none"};
  cursor: inherit;

  &:hover {
    color: ${theme("mode", {
      light: "#002d61",
      dark: "#b9c2eb"
    })};
  }
`;
