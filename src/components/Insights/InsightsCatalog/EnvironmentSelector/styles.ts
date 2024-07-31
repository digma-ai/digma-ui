import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-grow: 1;
`;

export const EnvironmentsContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-grow: 1;

  & > * {
    flex: 1 1 0;
  }
`;
