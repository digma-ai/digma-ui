import styled from "styled-components";
import {
  bodyRegularTypography,
  bodySemiboldTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../App/typographies";
import {
  ButtonLabelProps,
  ButtonProps,
  ChevronIconContainerProps,
  OptionListItemProps
} from "./types";

export const ButtonLabel = styled.span<ButtonLabelProps>`
  ${subscriptRegularTypography}
  margin-right: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 5px 6px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.v3.text.primary : theme.colors.v3.text.secondary};
`;

export const Button = styled.button<ButtonProps>`
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.v3.surface.brandDark : "transparent"};
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  outline: none;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
  }

  &:focus,
  &:active {
    background: ${({ theme }) => theme.colors.v3.surface.brandDark};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:focus,
  &:disabled:active {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
    color: ${({ theme }) => theme.colors.v3.text.disabled};

    ${ButtonLabel} {
      color: ${({ theme }) => theme.colors.v3.text.disabled};
    }
  }
`;

export const ButtonIconContainer = styled.div`
  display: flex;
`;

export const Number = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  margin-left: auto;
  ${footnoteRegularTypography}
`;

export const ChevronIconContainer = styled.span<ChevronIconContainerProps>`
  display: flex;
  color: ${({ theme, $disabled }) =>
    $disabled
      ? theme.colors.v3.icon.disabled
      : theme.colors.v3.stroke.primaryLight};
`;

export const MenuContainer = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primaryLight};
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
  display: flex;
  flex-direction: column;
  max-height: 162px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  gap: 8px;
  outline: none;
`;

export const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  overflow-y: auto;
  outline: none;
`;

export const OptionListItem = styled.li<OptionListItemProps>`
  display: flex;
  gap: 8px;
  max-height: 28px;
  align-self: stretch;
  align-items: center;
  padding: 5px 8px;
  border-radius: 4px;
  color: ${({ $enabled, theme }) =>
    $enabled ? theme.colors.v3.text.primary : theme.colors.v3.text.disabled};
  cursor: ${({ $enabled }) => ($enabled ? "pointer" : "default")};

  ${({ $selected, theme, $enabled }) =>
    $selected && $enabled ? `background: ${theme.colors.v3.surface.gray}` : ""};

  &:hover {
    background: ${({ theme, $enabled }) =>
      $enabled ? theme.colors.v3.surface.highlight : ""};
  }

  button {
    :focus-visible {
      outline: none;
    }
  }
`;

export const OptionListItemLabel = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${bodyRegularTypography}
`;

export const NoResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  gap: 8px;
  flex-direction: column;

  ${bodySemiboldTypography}
`;

export const NoSearchResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};

  ${footnoteRegularTypography}
`;

export const SearchInputContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  padding: 5px 8px;
  gap: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);
`;

export const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.v3.text.primary};

  ${subscriptRegularTypography}

  &::placeholder {
    color: ${({ theme }) => theme.colors.v3.text.primary};
  }
`;

export const SearchInputIconContainer = styled.div`
  pointer-events: none;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;
