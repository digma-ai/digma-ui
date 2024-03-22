import styled from "styled-components";
import { subscriptSemiboldTypography } from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 0 12px;
  height: 44px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 5px 10px 0 rgb(0 0 0 / 15%)";
      case "dark":
      case "dark-jetbrains":
        return "0 9px 24px 0 rgb(0 0 0 / 30%)";
    }
  }};
`;

export const Divider = styled.div`
  margin: 0 8px;
  border-radius: 1px;
  width: 1px;
  height: 13px;
  background: ${({ theme }) => theme.colors.v3.stroke.primary};
`;

export const Header = styled.div`
  ${subscriptSemiboldTypography}
  display: flex;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

export const TabPanel = styled.div`
  display: flex;
  gap: 16px;
`;

export const CancelButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
`;
