import styled from "styled-components";
import { Toggle } from "../../common/v3/Toggle";
import { OptionButton } from "../../common/v3/Toggle/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: fit-content;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  padding: 24px;
  gap: 24px;
`;

export const Content = styled.div`
  padding: 32px;
  display: flex;
  gap: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border-radius: 12px;
  width: 100%;
`;

export const ViewModeToggle = styled(Toggle)`
  border-radius: 8px;
  padding: 6px;
  align-items: center;
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.v3.stroke.dark};

  ${OptionButton} {
    padding: 6px;
  }
`;

export const TimeModeToggle = styled(Toggle)`
  border-radius: 8px;
  padding: 0;
  align-items: center;
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.v3.stroke.dark};

  ${OptionButton} {
    padding: 10px 16px;

    &:first-child {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    &:last-child {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
`;
