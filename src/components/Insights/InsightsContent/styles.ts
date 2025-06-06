import styled from "styled-components";
import { LAYERS } from "../../common/App/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

// export const Description = styled.div`
//   display: flex;
//   gap: 8px;
//   font-size: 14px;
//   color: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#828797";
//       case "dark":
//       case "dark-jetbrains":
//         return "#b4b8bf";
//     }
//   }};
// `;

// export const Link = styled(CommonLink)`
//   text-decoration: none;
//   color: ${({ theme }) => {
//     switch (theme.mode) {
//       case "light":
//         return "#7891d0";
//       case "dark":
//       case "dark-jetbrains":
//         return "#92affa";
//     }
//   }};
// `;

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
