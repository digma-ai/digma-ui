import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  flex-grow: 1;

  & > * {
    flex: 1 1 0;
  }
`;
