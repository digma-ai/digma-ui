import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-grow: 1;
  position: relative;
`;

// export const CarouselContainer = styled.div`
//   width: 100%;

//   & ul {
//     gap: 4px;
//   }

//   & ul > li > * {
//     width: 100%;
//   }
// `;

export const EnvironmentsContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  flex-grow: 1;

  & > * {
    flex: 1 1 0;
  }
`;

// export const CarouselButton = styled(NewIconButton)<CarouselButtonProps>`
//   position: absolute;
//   border-radius: 0;
//   border: none;
//   height: 100%;
//   width: 44px;

//   ${({ direction, theme }) => {
//     const hexColor = theme.colors.v3.surface.primary;
//     const rgbColor = hexToRgb(hexColor);

//     return direction === "left"
//       ? css`
//           padding-left: 22px;
//           left: 0;
//           background: ${rgbColor
//             ? `linear-gradient(
//             90deg,
//             ${hexColor} 35%,
//             rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 100%
//           )`
//             : "transparent"};
//         `
//       : css`
//           padding-right: 22px;
//           right: 0;
//           background: ${rgbColor
//             ? `linear-gradient(
//             90deg,
//             rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 4.55%,
//             ${hexColor} 60.23%
//           )`
//             : "transparent"};
//         `;
//   }}

//   &:hover:enabled {
//     border: none;
//     ${({ direction, theme }) => {
//       const hexColor = theme.colors.v3.surface.primary;
//       const rgbColor = hexToRgb(hexColor);

//       return direction === "left"
//         ? css`
//             background: ${rgbColor
//               ? `linear-gradient(
//             90deg,
//             ${hexColor} 35%,
//             rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 100%
//           )`
//               : "transparent"};
//           `
//         : css`
//             background: ${rgbColor
//               ? `linear-gradient(
//             90deg,
//             rgba(${rgbColor.r} ${rgbColor.g} ${rgbColor.b} / 0%) 4.55%,
//             ${hexColor} 60.23%
//           )`
//               : "transparent"};
//           `;
//     }}
//   }
// `;
