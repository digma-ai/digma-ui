import styled from "styled-components";
import {
  subheading1MediumTypography,
  subheading2RegularTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const Title = styled.span`
  ${subheading1MediumTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const IconContainer = styled.span`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Button = styled.button`
  ${subheading2RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  text-transform: capitalize;
  padding: 0;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.v3.text.link};
  }
`;

export const ByCriticalityButton = styled(Button)`
  padding-right: 10px;
`;

export const BySeverityButton = styled(Button)`
  padding-left: 23px;
`;

export const ChevronIconContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const Divider = styled.img`
  width: 20px;
  height: 69px;
`;
