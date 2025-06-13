import { Link } from "react-router";
import styled from "styled-components";
import {
  subheading2RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { NewButton } from "../../common/v3/NewButton";
import { PulsatingDot } from "../common/PulsatingDot";
import type { IncidentItemProps } from "./types";

export const Container = styled.aside`
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  display: flex;
  flex-direction: column;
  padding: 40px 24px 32px;
  gap: 32px;
  width: 283px;
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

export const GradientBackground = styled.div`
  position: absolute;
  width: 317.7%;
  height: 110.8%;
  left: -30%;
  top: 67.4%;
  border-radius: 959px;
  opacity: 0.7;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(79 93 163 / 60%) 0%,
    rgb(79 93 163 / 0%) 100%
  );
  filter: blur(5px);
  z-index: -1;
`;

export const LogoLink = styled(Link)`
  display: flex;
`;

export const Logo = styled.img`
  height: 24px;
`;

export const IncidentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  flex-grow: 1;
`;

export const IncidentsListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IncidentsListTitle = styled.div`
  ${subheading2RegularTypography};
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const IncidentsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
`;

export const IncidentItem = styled.li<IncidentItemProps>`
  ${subscriptRegularTypography};
  display: flex;
  gap: 8px;
  align-items: center;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.v3.surface.secondary : "none"};
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  color: ${({ theme, $isActive: $isLive, $isSelected }) =>
    $isLive || $isSelected
      ? theme.colors.v3.text.primary
      : theme.colors.v3.text.tertiary};
`;

export const IncidentItemTitle = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const StyledPulsatingDot = styled(PulsatingDot)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.v3.status.high};
`;

export const TemplateButton = styled(NewButton)`
  color: ${({ theme }) => theme.colors.v3.text.white};
  width: 100%;
  font-size: 18px;
  line-height: 22px;
  justify-content: center;
`;

export const UserInfo = styled.button`
  ${subscriptRegularTypography};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Avatar = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${/* TODO: change to color from the theme */ ""}
  background: #6271b6;
  color: ${({ theme }) => theme.colors.v3.text.white};
  font-size: 14px;
  ${/* TODO: add the font */ ""}
  font-family: Inter, sans-serif;
`;
