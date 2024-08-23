import styled from "styled-components";
import { subscriptRegularTypography } from "../../App/typographies";
import { ButtonElementProps } from "./types";

const BaseButton = styled.button<ButtonElementProps>`
  ${subscriptRegularTypography}

  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  width: fit-content;
  cursor: pointer;
  user-select: none;

  &:disabled {
    cursor: initial;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  padding: 5px 7px;
  color: ${({ theme }) => theme.colors.v3.icon.white};
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};

  span {
    color: ${({ theme }) => theme.colors.v3.text.white};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandSecondary};
    background: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
  }

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandSecondary};
    background: ${({ theme }) => theme.colors.v3.surface.brandPrimary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
    background: ${({ theme }) => theme.colors.v3.surface.gray};

    span {
      color: ${({ theme }) => theme.colors.v3.text.tertiary};
    }
  }
`;

export const SecondaryButton = styled(BaseButton)`
  padding: 5px 7px;
  color: ${({ theme }) => theme.colors.v3.icon.primary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);

  span {
    color: ${({ theme }) => theme.colors.v3.text.primary};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
    background: ${({ theme }) => theme.colors.v3.surface.brandDark};
  }

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
    background: ${({ theme }) => theme.colors.v3.surface.primary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};

    span {
      color: ${({ theme }) => theme.colors.v3.text.disabled};
    }
  }
`;

export const PrimaryBorderlessButton = styled(BaseButton)`
  padding: 5px 7px;
  color: ${({ theme }) => theme.colors.v3.icon.primary};
  border: 1px solid transparent;
  background: none;

  span {
    color: ${({ theme }) => theme.colors.v3.text.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.v3.icon.brandTertiary};

    span {
      color: ${({ theme }) => theme.colors.v3.text.link};
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};

    span {
      color: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};

    span {
      color: ${({ theme }) => theme.colors.v3.text.disabled};
    }
  }
`;

export const SecondaryBorderlessButton = styled(BaseButton)`
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  border: 1px solid transparent;
  background: none;

  span {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.v3.icon.primary};

    span {
      color: ${({ theme }) => theme.colors.v3.text.primary};
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.v3.icon.secondary};

    span {
      color: ${({ theme }) => theme.colors.v3.text.secondary};
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};

    span {
      color: ${({ theme }) => theme.colors.v3.text.disabled};
    }
  }
`;
