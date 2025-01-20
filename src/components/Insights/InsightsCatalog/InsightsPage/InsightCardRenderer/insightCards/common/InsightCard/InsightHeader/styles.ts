import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../../../../../../../common/App/typographies";
import { CopyButton } from "../../../../../../../../common/v3/CopyButton";
import { Info } from "../../../../../../../../common/v3/Info";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledCopyButton = styled(CopyButton)`
  padding: 0 6px;
  display: none;
`;

export const SpanInfoRow = styled.div`
  display: flex;
  padding: 0 32px;
  gap: 4px;
  align-items: center;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const Title = styled.div`
  ${bodySemiboldTypography}

  display: flex;
  gap: 4px;
  align-items: center;
`;

export const TitleInfo = styled(Info)`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const BadgeContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
`;

export const Description = styled.div`
  ${footnoteRegularTypography}
  gap: 4px;
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
