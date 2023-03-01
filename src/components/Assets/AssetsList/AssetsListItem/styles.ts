import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  background: #3d3f41;
`;

export const Category = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px 8px 8px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
  letter-spacing: -0.1px;
  user-select: none;
  background: #383838;
  border-radius: 4px;
`;

export const InsightCount = styled.span`
  margin-left: auto;
  font-weight: 400;
  color: #9b9b9b;
`;

// export const SubItemsList = styled.span`
//   display: flex;
//   flex-direction: column;
//   font-weight: 400;
//   font-size: 10px;
//   line-height: 12px;
//   color: #9b9b9b;
//   gap: 1px;
// `;

// export const SubItem = styled.span`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 9px 12px 7px 26px;
//   background: #383838;

//   &:last-child {
//     border-radius: 0 0 4px 4px;
//   }
// `;

// export const NoDataText = styled.span`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 10px 8px 8px 24px;

//   font-weight: 400;
//   font-size: 10px;
//   line-height: 12px;
//   display: flex;
//   align-items: center;
//   color: #9b9b9b;
// `;
