import styled from "styled-components";
import { Link as CommonLink } from "../common/Link";

/** @deprecated */
export const Description = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const Link = styled(CommonLink)`
  text-decoration: none;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#92affa";
    }
  }};
`;
