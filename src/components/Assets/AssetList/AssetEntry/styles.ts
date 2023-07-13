import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  gap: 2px;
  height: 20px;
  align-items: center;
`;

export const AssetTypeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  align-items: center;
`;

export const Link = styled.a`
  color: #7891d0;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const InsightIconsContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-left: auto;
`;

export const InsightIconContainer = styled(AssetTypeIconContainer)`
  border-radius: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#2e2e2e";
    }
  }};
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 15px 12px;
  flex-wrap: wrap;
  font-size: 10px;
  line-height: 12px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:first-child {
    width: 35%;
  }

  &:nth-child(2) {
    width: 35%;
  }
`;

export const ServicesContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

export const ServiceName = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
  border-radius: 23px;
  line-height: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#c6c6c6";
    }
  }};
`;

export const Suffix = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;
