import styled from "styled-components";
import { Link as CommonLink } from "../../../../common/v3/Link";
import { Tag } from "../../../../common/v3/Tag";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 24px;
`;

export const IssueInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
`;

export const IssueTypeTitle = styled.span`
  font-size: 18px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Link = styled(CommonLink)`
  font-size: 18px;
  line-height: 18px;
  text-decoration: underline;
`;

export const CriticalityTag = styled(Tag)`
  width: 68px;
  max-width: 68px;
  height: 24px;
`;

export const CriticalityLabel = styled.span`
  font-size: 16px;
  line-height: 18px;
`;
