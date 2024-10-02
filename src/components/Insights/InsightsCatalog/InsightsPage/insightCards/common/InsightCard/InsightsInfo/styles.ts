import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../../../../../common/App/typographies";
import { Link } from "../../../../../../../common/v3/Link";
import { NewIconButton } from "../../../../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";

export const CloseButton = styled(NewIconButton)`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 20px;
`;

export const Description = styled.div`
  ${footnoteRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px 12px;
`;

export const StyledLink = styled(Link)`
  ${subscriptRegularTypography}
  text-decoration: underline;
  padding: 4px 0;
`;

export const InfoTooltip = styled(Tooltip)`
  max-width: 256px;
`;
