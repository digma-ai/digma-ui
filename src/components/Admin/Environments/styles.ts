import styled from "styled-components";
import {
  bodyRegularTypography,
  footnoteLightTypography,
  footnoteRegularTypography
} from "../../common/App/typographies";
import { Overlay as CommonOverlay } from "../../common/Overlay";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 36px;
`;

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
`;

export const TableHead = styled.div`
  ${footnoteRegularTypography}
  height: 48px;
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
`;

export const TableHeadRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
`;

export const TableHeaderCell = styled.div`
  box-sizing: border-box;

  &:first-child {
    padding-left: 22px;
  }

  &:last-child {
    padding-right: 18px;
  }
`;

export const TableBody = styled.div`
  ${bodyRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
`;

export const TableBodyRow = styled.div`
  display: flex;
  gap: 16px;
  height: 42px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};

  &:last-child {
    border-bottom: none;
  }
`;

export const TableBodyCell = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 24px;
    justify-content: flex-end;
  }
`;

export const LastActiveTimestamp = styled.span`
  ${footnoteLightTypography}
  line-height: 18px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const EnvironmentType = styled.span`
  ${footnoteLightTypography}
  line-height: 18px;
`;

export const Overlay = styled(CommonOverlay)`
  align-items: center;
`;
