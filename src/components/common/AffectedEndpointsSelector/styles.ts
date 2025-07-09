import styled from "styled-components";
import { footnoteRegularTypography } from "../App/typographies";
import { EndpointOption } from "./EndpointOption";
import { RouteLink } from "./EndpointOption/styles";

export const ListHeader = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const ServicePart = styled.div`
  width: 151px;
`;

export const ListHeaderEndpointOption = styled(EndpointOption)`
  ${footnoteRegularTypography}

  & > ${RouteLink} {
    ${footnoteRegularTypography}
  }
`;
