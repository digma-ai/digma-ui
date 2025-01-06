import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { subheading2RegularTypography } from "../../../../common/App/typographies";
import type { LinkProps } from "./types";

export const Link = styled(RouterLink)<LinkProps>`
  width: 360px;
  height: 168px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
  cursor: ${({ $isEnabled }) => ($isEnabled ? "pointer" : "initial")};
`;

export const Background = styled.img`
  object-fit: cover;
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
`;

export const ChevronIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const Title = styled.span`
  ${subheading2RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-transform: capitalize;
`;
