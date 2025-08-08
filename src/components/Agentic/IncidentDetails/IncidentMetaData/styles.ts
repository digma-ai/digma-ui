import styled from "styled-components";
import { subheading1RegularTypography } from "../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  padding-top: 24px;
  min-height: 51px;
  flex-shrink: 0;
  align-items: start;
`;

export const AttributesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: auto;
`;

export const DividerContainer = styled.div`
  color: ${({ theme }) => theme.colors.v3.stroke.primary};
  height: 25px;
  display: flex;
`;

export const Attribute = styled.div`
  ${subheading1RegularTypography}
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
`;

export const AttributeLabel = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const AttributeValue = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StatusAttributeValue = styled(AttributeValue)`
  text-transform: capitalize;
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

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-top: 12px;
  margin-right: 16px;
`;
