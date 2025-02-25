import styled from "styled-components";

import { subscriptBoldTypography } from "../../../common/App/typographies";
import { Select as CommonSelect } from "../../../common/v3/Select";
import {
  ButtonIconContainer,
  ButtonLabel,
  ChevronIconContainer
} from "../../../common/v3/Select/styles";

export const Select = styled(CommonSelect)`
  width: 180px;
  height: 36px;
  border-radius: 8px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  box-shadow: 0 0 4.9px 0 rgb(0 0 0 / 13%);

  & > ${ButtonIconContainer} {
    color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};
  }

  & > ${ButtonLabel} {
    ${subscriptBoldTypography}
  }

  & > ${ChevronIconContainer} {
    color: ${({ theme }) => theme.colors.v3.icon.brandSecondary};
  }
`;
