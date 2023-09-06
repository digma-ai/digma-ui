import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 12px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
`;

export const Title = styled.span`
  font-size: 16px;
  text-transform: capitalize;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const IllustrationContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const RunOrDebugIllustration = styled.img`
  width: 206px;
`;
