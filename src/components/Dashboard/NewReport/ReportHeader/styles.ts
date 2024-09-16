import styled from "styled-components";
import { Select } from "../../../common/v3/Select";

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
  width: 180px;
  border-radius: 8px;
  background: transparent;
`;

export const Filters = styled(Row)`
  display: flex;
  gap: 18px;
`;
