import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const TitleRow = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const Title = styled.span`
  ${bodySemiboldTypography}

  direction: rtl;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ScoreContainer = styled.div`
  margin-left: auto;
`;

export const SubtitleRow = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 7px;
  color: ${({ theme }) => theme.colors.v3.text.disabled};
  padding-left: 24px;
`;

export const LocationName = styled.span`
  ${subscriptRegularTypography}

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
