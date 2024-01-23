import styled from "styled-components";
import { grayScale, primaryScale } from "../App/getTheme";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  border: 1px solid
    ${({ theme, $isOpen }) =>
      $isOpen ? theme.colors.stroke.brand : theme.colors.stroke.primary};
  background: ${({ theme }) => theme.colors.surface.secondary};
  border-radius: 4px;
  padding: 4px 6px 4px 4px;
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  font-size: 14px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.stroke.secondary};
  }

  &:focus,
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.stroke.brand};
  }
`;

export const ButtonLabel = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.base};
  margin-right: auto;
`;

export const Number = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  color: ${grayScale[0]};
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${primaryScale[300]};
  margin-left: auto;
`;

export const Counts = styled.span`
  color: ${grayScale[300]};
`;

export const FilteredCount = styled.span`
  color: ${primaryScale[200]};
`;

export const ChevronIconContainer = styled.span`
  color: ${({ theme }) => theme.colors.icon.primary};
`;

export const MenuContainer = styled.div`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${grayScale[1100]};
  background: ${grayScale[800]};
  box-shadow: 0 2px 4px 0 rgba(0 0 0 / 2%);
  gap: 4px;
  display: flex;
  flex-direction: column;
  max-height: 162px;
  box-sizing: border-box;
`;

export const SearchInputContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${grayScale[700]};
  padding: 5px 8px;
  gap: 4px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 0;
  color: ${grayScale[0] /* TODO: use theme */};

  &::placeholder {
    color: ${grayScale[500]};
  }
`;

export const SearchInputIconContainer = styled.div`
  pointer-events: none;
  color: ${grayScale[400]};
`;

export const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  font-size: 14px;
`;

export const OptionListItem = styled.li`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  cursor: pointer;
`;

export const NoResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtext};
`;