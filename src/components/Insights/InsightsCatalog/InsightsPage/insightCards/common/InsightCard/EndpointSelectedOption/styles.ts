import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../../../common/App/typographies";
import { CopyButton } from "../../../../../../../common/v3/CopyButton";

export const StyledCopyButton = styled(CopyButton)`
  display: none;
  padding: 0;
`;

export const Container = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const EndpointName = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
`;

export const ServiceName = styled.span`
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
