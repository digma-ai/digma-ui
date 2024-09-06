import styled from "styled-components";
import { footnoteRegularTypography } from "../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-grow: 1;
  align-self: center;
`;
