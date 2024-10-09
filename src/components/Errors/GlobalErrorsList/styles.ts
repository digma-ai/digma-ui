import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  height: 100%;
  box-sizing: border-box;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  overflow: auto;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
