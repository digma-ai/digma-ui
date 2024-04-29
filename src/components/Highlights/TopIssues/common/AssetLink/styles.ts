import styled from "styled-components";
import { CopyButton } from "../../../../common/v3/CopyButton";

export const StyledCopyButton = styled(CopyButton)`
  display: none;
  padding: 0;
`;

export const Container = styled.div`
  display: flex;
  gap: 4px;
  padding: 6px 0;
  width: fit-content;
  max-width: 100%;
  align-items: center;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;
