import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
  overflow: auto;
`;

export const Toolbar = styled.div`
  display: flex;
  height: 28px;
  flex-shrink: 0;
  gap: 4px;

  & > * {
    &:nth-child(1) {
      width: 20%;
      flex-grow: 1;
    }

    &:nth-child(2) {
      width: 40%;
      flex-grow: 1;
    }

    &:nth-child(3) {
      width: 20%;
      flex-grow: 1;
    }

    &:nth-child(4) {
      width: 28px;
      flex-shrink: 0;
    }

    &:nth-child(5) {
      width: 28px;
      flex-shrink: 0;
    }
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
