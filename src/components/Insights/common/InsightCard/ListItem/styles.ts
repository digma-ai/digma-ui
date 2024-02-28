import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const Link = styled.a`
  ${footnoteRegularTypography}

  cursor: pointer;
  color: ${({ theme }) => theme.colors.v3.text.link};
  text-decoration: none;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
