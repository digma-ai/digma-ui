import styled from "styled-components";
import { subheading2RegularTypography } from "../../../../common/App/typographies";

export const Container = styled.div`
  width: 360px;
  height: 168px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
`;

export const Title = styled.span`
  ${subheading2RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-transform: capitalize;
`;
