import styled from "styled-components";
import { footnoteRegularTypography } from "../../common/App/typographies";
import { NewEmptyState } from "../../common/v3/NewEmptyState";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 8px;
  margin: 0;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: center;
  height: 100%;
`;

export const EmptyStateTextContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const StyledEmptyState = styled(NewEmptyState)`
  flex-grow: 1;
  align-self: center;
`;
