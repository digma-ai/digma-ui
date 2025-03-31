import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px 0 8px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDarkest};
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  padding: 16px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ToolbarRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const TabsContainer = styled.div`
  padding: 0 8px;
`;
