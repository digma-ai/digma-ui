import styled from "styled-components";
import { footnoteRegularTypography } from "../../common/App/typographies";

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

export const EmptyStateContent = styled.div`
  ${footnoteRegularTypography}
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  max-width: 210px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const SortButtonIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;
