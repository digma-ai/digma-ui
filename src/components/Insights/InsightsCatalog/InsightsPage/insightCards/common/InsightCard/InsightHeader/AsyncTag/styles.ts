import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../../../../common/App/typographies";
import { Tag as TagCommon } from "../../../../../../../../common/v3/Tag";

export const AsyncTag = styled(TagCommon)`
  ${footnoteRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
`;
