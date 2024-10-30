import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptMediumTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { AutoAnimatedContainer } from "../../common/AutoAnimatedContainer";
import { EyeIcon } from "../../common/icons/16px/EyeIcon";
import { DismissBtnIconProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  height: 100%;
  box-sizing: border-box;
`;

export const Description = styled.div`
  ${subscriptMediumTypography}
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  gap: 5px;
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ToolbarRow = styled.div`
  display: flex;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
`;

export const ViewModeToolbarRow = styled(ToolbarRow)`
  padding: 4px 0;
`;

export const BackToAllErrorsButtonIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};
`;

export const BackToAllErrorsButton = styled.button`
  ${subscriptRegularTypography}

  font-family: inherit;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ToolbarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const ListContainer = styled(AutoAnimatedContainer)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  overflow: auto;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const EmptyStateContent = styled.div`
  ${footnoteRegularTypography}
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  max-width: 210px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const ButtonIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const DismissBtnIcon = styled(EyeIcon)<DismissBtnIconProps>`
  color: ${({ theme, $isDismissedMode }) =>
    $isDismissedMode ? theme.colors.v3.icon.brandSecondary : "currentColor"};
`;
