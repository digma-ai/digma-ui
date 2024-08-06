import styled, { css } from "styled-components";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { CarouselButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-grow: 1;
  position: relative;
`;

export const EnvironmentsContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-grow: 1;

  & > * {
    flex: 1 1 0;
  }
`;

export const CarouselButton = styled(NewIconButton)<CarouselButtonProps>`
  position: absolute;
  ${({ direction }) =>
    direction === "left"
      ? css`
          padding-left: 22px;
          left: 0;
          background: linear-gradient(
            90deg,
            #222326 35%,
            rgba(34 35 38 / 0%) 100%
          );
        `
      : css`
          padding-right: 22px;
          right: 0;
          background: linear-gradient(
            90deg,
            rgba(34 35 38 / 0%) 4.55%,
            #222326 60.23%
          );
        `}
`;
