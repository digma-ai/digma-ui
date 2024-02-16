import styled, { keyframes } from "styled-components";
import { IconButton } from "../IconButton";

const rotateBackgroundAnimation = keyframes`
  from {
    background-position: 0% 50%; 
  }
  to {
    background-position: 100% 50%; 
  }
`;

export const Outline = styled.div`
  border-radius: 4px;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 /25%), 0 0 9.1px 0 rgb(96 99 246 / 30%);
  background-image: linear-gradient(135deg, rgb(78 38 152 / 50%), #7e80e8);
  ${"" /* TODO: improve gradient colors and animation */}
  animation: ${rotateBackgroundAnimation} 0.8s ease-in-out alternate infinite;
  background-size: 400% 400%;
`;

export const CodeButton = styled(IconButton)`
  &:enabled,
  &:hover:enabled,
  &:active:enabled {
    border: none;
  }
`;
