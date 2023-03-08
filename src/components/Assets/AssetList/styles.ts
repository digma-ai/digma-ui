import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  padding: 0;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  background: #383838;
  color: #dadada;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  padding: 8px 12px 8px 8px;
`;

export const ItemsCount = styled.span`
  margin-left: auto;
  font-weight: 400;
  color: #9f9f9f;
`;

export const List = styled.ul`
  padding: 8px 9px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
`;

export const Link = styled.a`
  color: #7891d0;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

export const NoDataText = styled.span`
  padding: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #9b9b9b;
  text-align: center;
`;

export const InsightIconsContainer = styled.span`
  display: flex;
  gap: 2px;
`;

export const InsightIconContainer = styled.span`
  background: #2e2e2e;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;
