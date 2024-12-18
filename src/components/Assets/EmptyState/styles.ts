import styled from "styled-components";
import { Link } from "../../common/Link";
import { Spinner as CommonSpinner } from "../../common/v3/Spinner";

export const Spinner = styled(CommonSpinner)`
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const TroubleshootingLink = styled(Link)`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#7891d0";
      case "dark":
      case "dark-jetbrains":
        return "#92affa";
    }
  }};
`;
