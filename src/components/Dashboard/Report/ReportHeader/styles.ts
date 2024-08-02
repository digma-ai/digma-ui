import styled from "styled-components";
import { headingTowBoldTypography } from "../../../common/App/typographies";
import { Select } from "../../../common/v3/Select";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FiltersContainer = styled.div`
  position: relative;
  height: 189px;
  overflow: hidden;
`;

export const Header = styled.div`
  ${headingTowBoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.white};
  text-align: center;
  height: 43px;
`;

export const FiltersGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

export const Group = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/images/nightCityView.svg");
`;

export const FilterSelector = styled(Select)`
  width: 180px;
  height: 28px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
