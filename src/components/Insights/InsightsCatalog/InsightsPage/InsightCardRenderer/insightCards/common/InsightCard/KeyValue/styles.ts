import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../../../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
`;

export const KeyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Key = styled.div`
  ${footnoteRegularTypography}

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Value = styled.div`
  ${subscriptRegularTypography}

  width: fit-content;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
