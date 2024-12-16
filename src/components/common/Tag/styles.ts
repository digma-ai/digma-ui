import styled from "styled-components";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  font-size: 14px;
  font-weight: normal;
  display: flex;
  padding: 4px;
  align-items: center;
  min-width: 16px;
  justify-content: center;
  gap: 4px;
  border-radius: 4px;
  max-width: fit-content;
  color: ${({ theme, $type }) =>
    $type ? theme.colors.tag[$type].text : theme.colors.tag.default.text};
  background: ${({ theme, $type }) =>
    $type
      ? theme.colors.tag[$type].background
      : theme.colors.tag.default.background};
`;

export const ValueContainer = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TextContainer = styled.span`
  padding: 0 4px;
`;
