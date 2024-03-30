import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../common/App/typographies";

export const InfoContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const SelectedItem = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 4px;
  align-items: center;
`;
