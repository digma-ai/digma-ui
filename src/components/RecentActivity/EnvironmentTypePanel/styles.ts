import styled from "styled-components";
import {
  bodyBoldTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Button } from "../../common/v3/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Subtitle = styled.span`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const ContentContainer = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 16px;
`;

export const EnvironmentTypeCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  box-shadow: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "0 1px 5px 0 rgb(0 0 0 / 12%)";
      case "dark":
      case "dark-jetbrains":
        return "0 1px 4px 0 rgb(0 0 0 / 45%)";
    }
  }};
  border-radius: 8px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 250px;
  width: max-content;
`;

export const EnvironmentTypeTextContainer = styled.div`
  ${subscriptRegularTypography}
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  gap: 4px;
`;

export const EnvironmentTypeTitle = styled.span`
  ${bodyBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const AddButton = styled(Button)`
  width: 60px;
  justify-content: center;
`;
