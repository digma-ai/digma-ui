import styled from "styled-components";
import { caption1RegularTypography } from "../../../common/App/typographies";

export const DescriptionContainer = styled.div`
  ${caption1RegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;
