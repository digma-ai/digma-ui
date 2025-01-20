import styled from "styled-components";
import { CopyButton } from "../../../../../../../../common/v3/CopyButton";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  height: 28px;
  box-sizing: border-box;
`;

export const StyledCopyButton = styled(CopyButton)`
  display: none;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const EndContentContainer = styled.div`
  display: flex;
  gap: 8px;
`;
