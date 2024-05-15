import styled from "styled-components";

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   overflow: auto;
// `;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// export const ToolbarContainer = styled.div`
//   display: flex;
//   height: 28px;
//   gap: 4px;

//   & > * {
//     &:nth-child(1) {
//       width: 70%;
//       flex-grow: 1;
//     }

//     &:nth-child(2) {
//       width: 20%;
//       flex-grow: 1;
//     }

//     &:nth-child(5) {
//       flex-shrink: 0;
//     }
//   }
// `;

export const AssetTypeContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  height: 20px;
`;
