import styled from "styled-components";
import { Link } from "../styles";

export const TitleIcon = styled.div`
  fill: #a1b5ff;
  display: flex;
`;

export const TitleText = styled.div`
  fill: #a1b5ff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
`;

export const Title = styled.div`
  border-radius: 4px 4px 0 0;
  display: flex;
  padding: 4px 12px;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#B9C0D4";
      case "dark":
      case "dark-jetbrains":
        return "#28293E";
    }
  }};
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#002D61";
      case "dark":
      case "dark-jetbrains":
        return "#a1b5ff;";
    }
  }};
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;

export const Header = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const InsightIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 2px;
  border-radius: 4px;
  position: relative;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#dfe1e5";
      case "dark":
      case "dark-jetbrains":
        return "#43454a";
    }
  }};
`;

export const TicketIconContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 2px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
`;

export const TicketIconLink = styled(Link)`
  display: flex;
  margin-top: 2px;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
`;

export const Toolbar = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Stats = styled.span`
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#b9c2eb";
    }
  }};
`;

export const ExpandButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const RefreshContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  font-size: 14px;
`;

export const AsyncBadge = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  padding: 2px 4px;
  text-align: center;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#4b5fab";
    }
  }};
`;

export const InfoContainer = styled.div`
  display: flex;
`;
