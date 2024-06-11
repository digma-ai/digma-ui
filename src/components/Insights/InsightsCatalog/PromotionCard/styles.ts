import styled from "styled-components";
import {
  bodySemiboldTypography,
  subheadingSemiboldTypography
} from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";

export const CollapsedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.brandPrimary};
  padding: 8px 8px 8px 12px;
  align-items: flex-start;
  border-radius: 4px;
`;

export const PromoText = styled.span`
  ${bodySemiboldTypography}

  b {
    ${bodySemiboldTypography};
    color: ${({ theme }) => theme.colors.v3.text.link};
  }
`;

export const CrossButton = styled(Button)`
  padding: 0;
  position: absolute;
  right: 16px;
  top: 9px;
`;

export const ExpandedContainer = styled.div`
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  height: 161px;
  position: relative;
`;

export const ActionContainer = styled.div`
  display: flex;
  /* stylelint-disable-next-line value-no-vendor-prefix */
  height: -webkit-fill-available;
  flex: 1;
  align-items: end;
  justify-content: end;
  padding-bottom: 16px;
  padding-right: 16px;
`;

export const DetailsContainer = styled.div`
  width: 264px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Description = styled.span`
  ${subheadingSemiboldTypography}

  width: 167px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledButton = styled(Button)`
  padding: 6px 8px;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const Background = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const LogoBackground = styled.div`
  z-index: -1;
  position: absolute;
  right: 0;
`;

export const SkipButton = styled(Button)`
  span {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }
`;
