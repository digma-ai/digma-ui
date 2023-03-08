import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  background: #3d3f41;
`;

export const AssetType = styled.span`
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

export const EntryCount = styled.span`
  margin-left: auto;
  font-weight: 400;
  color: #9b9b9b;
`;
