import styled from "styled-components";
import { IconButton } from "../common/IconButton";
import type { ExtendedIconButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
`;

export const ExtendedIconButton = styled(IconButton)<ExtendedIconButtonProps>`
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.v3.icon.brandTertiary
      : theme.colors.v3.surface.primary};
  background: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.v3.surface.brandDark
      : theme.colors.v3.surface.primary};
`;
