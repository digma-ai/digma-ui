import styled from "styled-components";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  min-width: 99px;
  max-width: fit-content;
  height: 22px;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 21px;
  font-size: 14px;
  font-weight: 500;
  box-sizing: border-box;
  color: #fff;
  background: ${({ theme, $status }) => {
    if ($status === "waiting-for-data") {
      return "#6b6dda";
    }
    switch (theme.mode) {
      case "light":
        return "rgb(103 210 139 / 64%)";
      case "dark":
      case "dark-jetbrains":
        return "rgb(103 210 139 / 24%)";
    }
  }};
`;
