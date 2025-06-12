import styled from "styled-components";
import { LAYERS } from "../../common/App/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  margin: auto;
  background: rgb(18 18 21 / 70%);
  z-index: ${LAYERS.OVERLAY};
  overflow: auto;
`;

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 16px 4%;
  overflow: hidden;
  box-sizing: border-box;
`;
