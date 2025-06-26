import styled from "styled-components";
import { subheading1RegularTypography } from "../../../common/App/typographies";
import { NewButton } from "../../../common/v3/NewButton";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 24px;
  height: 51px;
  flex-shrink: 0;
`;

export const DividerContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.stroke.primary};
  height: 25px;
  display: flex;
`;

export const CloseIncidentButton = styled(NewButton)`
  margin-left: auto;
  margin-right: 16px;
`;

export const DateAttribute = styled.div`
  ${subheading1RegularTypography}
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
`;

export const DateLabel = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const DateValue = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ServicesContainer = styled.div`
  ${subheading1RegularTypography}
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding: 16px;
`;

export const Tag = styled.div`
  ${subheading1RegularTypography}
  padding: 8px 12px;
  border-radius: 8px;
`;

export const ServiceTag = styled(Tag)`
  background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  color: ${({ theme }) => theme.colors.v3.text.primary};
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HiddenServicesCountTag = styled(Tag)`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
