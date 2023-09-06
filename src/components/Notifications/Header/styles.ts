import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  font-weight: 600;
  gap: 4px;
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

export const CloseButton = styled.button`
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  height: 14px;
`;
