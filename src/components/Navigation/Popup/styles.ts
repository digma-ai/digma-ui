import styled from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.v3.stroke.primaryLight}`};
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
  max-height: ${({ $height }) => ($height ? $height : "100px")};
  overflow-y: auto;
  padding: 8px;
`;
