import styled from "styled-components";
import { CustomStylesProps } from "./types";

export const Outline = styled.div<CustomStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
  background: rgb(103 210 139 / 40%);
  box-shadow: 0 0 8px rgb(76 142 241 / 12%);
  border-radius: 2px;

  ${({ $customStyles }) => ({ ...$customStyles })};
`;

export const Badge = styled.div<CustomStylesProps>`
  width: 4px;
  height: 4px;
  background: #67d28b;
  box-shadow: 0 0 4px #67d28b;
  border-radius: 1px;

  ${({ $customStyles }) => ({ ...$customStyles })};
`;
