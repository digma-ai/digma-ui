import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  caption1RegularTypography,
  subheading2RegularTypography
} from "../../../../common/App/typographies";
import type { BackgroundProps, LinkProps } from "./types";

export const Link = styled(RouterLink)<LinkProps>`
  aspect-ratio: 360 / 168;
  min-width: 370px;
  flex: 1 1 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  cursor: ${({ $isEnabled }) => ($isEnabled ? "pointer" : "initial")};
  transition: border-color, 300ms ease-out;

  ${({ $isEnabled, theme }) =>
    $isEnabled &&
    css`
      &:hover {
        border-color: ${theme.colors.v3.stroke.brandPrimary};

        ${Title} {
          color: ${theme.colors.v3.surface.brandSecondary};
        }
      }
    `}
`;

export const Background = styled.img<BackgroundProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: ${({ $isEnabled }) => ($isEnabled ? "normal" : "luminosity")};
`;

export const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const ChevronIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const Title = styled.span`
  ${subheading2RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-transform: capitalize;
  transition: color, 300ms ease-out;
`;

export const SoonBadge = styled.div`
  ${caption1RegularTypography}

  margin-left: auto;
  padding: 2px 6px;
  gap: 10px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.gray};
`;
