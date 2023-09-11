import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 14px;
  font-weight: 500;
  padding: 20px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7c7c94";
      case "dark":
      case "dark-jetbrains":
        return "#9b9b9b";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#fff";
      case "dark":
      case "dark-jetbrains":
        return "#1e1e1e";
    }
  }};
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#0f0f0f";
      case "dark":
      case "dark-jetbrains":
        return "#fff";
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionHeader = styled.div`
  display: flex;
  gap: 4px;
`;

export const SectionNumber = styled.span`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #6a6dfa;
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
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
