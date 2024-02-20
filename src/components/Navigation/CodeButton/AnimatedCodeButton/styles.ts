import styled, { css, keyframes } from "styled-components";

const codeIcon20pxDataUri =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMCAyMCI+CiAgPGcgc3Ryb2tlPSIjRjBGMUY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsaXAtcGF0aD0idXJsKCNhKSI+CiAgICA8cGF0aCBkPSJNNSA2LjkgMS4yIDEwIDUgMTMuMW0xMC02LjIgMy44IDMuMS0zLjggMy4xbS0yLjUtMTBMNy41IDE3Ii8+CiAgPC9nPgogIDxkZWZzPgogICAgPGNsaXBQYXRoIGlkPSJhIj4KICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgyMHYyMEgweiIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+Cjwvc3ZnPiA=";

const boxShadowAnimation = keyframes`
    from {
      box-shadow: none;
    }
  
    to {
      box-shadow: 1px 1px 4px 0 rgb(0 0 0 /25%), 0 0 9.1px 0 rgb(96 99 246 / 30%);

    }
  `;

const opacityAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// in pixels
const OUTER_SIZE = 32;
const BORDER_WIDTH = 1;
const ICON_SIZE = 20;
const OUTER_BORDER_RADIUS = 4;
const INNER_SIZE = OUTER_SIZE - BORDER_WIDTH * 2;
const INNER_BORDER_RADIUS = OUTER_BORDER_RADIUS - BORDER_WIDTH;

const gradientBackground = css`
  background-image: linear-gradient(135deg, rgb(78 38 152 / 50%), #7e80e8);
`;

const animationParams = css`
  animation-duration: 800ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

export const Button = styled.button`
  cursor: pointer;
  position: relative;
  width: ${OUTER_SIZE}px;
  height: ${OUTER_SIZE}px;
  border: none;
  padding: 0;
  background: none;
  border-radius: ${OUTER_BORDER_RADIUS}px;
  ${gradientBackground}
  animation-name: ${boxShadowAnimation};
  ${animationParams}
`;

export const BorderContainer = styled.div`
  border-radius: ${OUTER_BORDER_RADIUS}px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
  opacity: 0;
  animation-name: ${opacityAnimation};
  ${animationParams}
`;

const InnerSquare = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: ${INNER_SIZE}px;
  height: ${INNER_SIZE}px;
`;

export const Background = styled(InnerSquare)`
  border-radius: ${INNER_BORDER_RADIUS}px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};

  &:active {
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  }
`;

const MaskedSquare = styled(InnerSquare)`
  /* stylelint-disable property-no-vendor-prefix */
  -webkit-mask-image: url(${codeIcon20pxDataUri});
  mask-image: url(${codeIcon20pxDataUri});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: ${ICON_SIZE}px;
  mask-size: ${ICON_SIZE}px;
  -webkit-mask-position: center;
  mask-position: center;
  /* stylelint-enable property-no-vendor-prefix */
`;

export const EndMask = styled(MaskedSquare)`
  background: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
  opacity: 0;
  animation-name: ${opacityAnimation};
  ${animationParams}
`;

export const InitialMask = styled(MaskedSquare)`
  ${gradientBackground}
`;
