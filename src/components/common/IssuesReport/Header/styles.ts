import styled from "styled-components";
import {
  subheading2BoldTypography,
  subheading2RegularTypography
} from "../../App/typographies";
import { Select } from "../../v3/Select";
import { Toggle } from "../../v3/Toggle";
import { OptionButton } from "../../v3/Toggle/styles";

export const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow: hidden;
`;

export const Title = styled.span`
  ${subheading2BoldTypography}

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const TitleSuffix = styled.span`
  ${subheading2RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
`;

export const FilterSelect = styled(Select)`
  height: 36px;
  min-width: 190px;
  border-radius: 8px;
`;

export const Filters = styled(Row)`
  display: flex;
  gap: 18px;
`;

const StyledToggle = styled(Toggle)`
  align-items: center;
  background-color: transparent;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.v3.stroke.primaryLight};
`;

export const ViewModeToggle = styled(StyledToggle)`
  padding: 6px;

  ${OptionButton} {
    padding: 6px;
  }
`;

export const TimeModeToggle = styled(StyledToggle)`
  padding: 0;

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
