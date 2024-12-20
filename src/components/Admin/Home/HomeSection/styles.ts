import styled from "styled-components";
import { subheading2RegularTypography } from "../../../common/App/typographies";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

export const Header = styled.div`
  ${subheading2RegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-transform: capitalize;
`;
