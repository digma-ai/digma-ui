import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";
import { CopyButton } from "../../../common/v3/CopyButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 36px;
`;

export const TruncatedText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const StyledCopyButton = styled(CopyButton)`
  padding: 0 6px;
  display: none;
`;

export const AssetNameContainer = styled.span`
  display: flex;
  align-items: center;
  overflow: hidden;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const SpanCounterContainer = styled.span`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const SpanCounter = styled.div`
  border-radius: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.primaryLight};
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${subscriptRegularTypography}
`;
