import styled from "styled-components";
import { Link } from "../common/Link";

export const Container = styled.div`
  padding: 16px 6px 16px 12px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f1f5fa";
      case "dark":
      case "dark-jetbrains":
        return "#3d3f41";
    }
  }};
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;

export const CloseButton = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  line-height: 12px;
  height: 12px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
`;

export const SectionTitle = styled.h2`
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#788ca9";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
`;

export const Illustration = styled.img`
  margin-top: 4px;
`;

export const RunOptionsButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
`;

export const RunOptionButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 7px;
  border-radius: 4px;
  height: 56px;
  border: 1px solid transparent;
  outline: none;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#4d668a";
      case "dark":
      case "dark-jetbrains":
        return "#dadada";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#e9eef4";
      case "dark":
      case "dark-jetbrains":
        return "#383838";
    }
  }};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c2eb";
        case "dark":
        case "dark-jetbrains":
          return "#7c7c94";
      }
    }};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 2px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fbfdff";
      case "dark":
      case "dark-jetbrains":
        return "#49494d";
    }
  }};
`;

export const SlackLogoIconContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const SlackLink = styled(Link)`
  padding: 2px 0;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  font-size: 12px;
  line-height: normal;
  text-transform: capitalize;
`;
