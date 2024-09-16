import styled from "styled-components";
import { Select } from "../../../common/v3/Select";
import { Toggle } from "../../../common/v3/Toggle";
import { OptionButton } from "../../../common/v3/Toggle/styles";

export const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterSelect = styled(Select)`
  height: 36px;
  width: 168px;
  border-radius: 8px;
`;

export const Filters = styled(Row)`
  display: flex;
  gap: 18px;
`;

export const EnvironmentFilter = styled(FilterSelect)`
  width: 124px;
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
