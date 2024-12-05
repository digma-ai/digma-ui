import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

export const Overlay = styled.div<{
  $placement: "left" | "right";
  $visible: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ $placement }) =>
    $placement === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  width: 70px;
  background: linear-gradient(
    ${({ $placement }) => ($placement === "left" ? "90" : "270")}deg,
    #1a1b1e 0%,
    rgb(26 27 30 / 0%) 100%
  );
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 300ms;
  pointer-events: none;
`;
