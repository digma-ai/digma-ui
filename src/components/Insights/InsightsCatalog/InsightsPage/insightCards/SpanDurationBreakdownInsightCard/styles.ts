import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  gap: 8px;
`;

export const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0 8px;
`;

export const EntryListHeader = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const DurationTitle = styled.span`
  white-space: pre;
`;
