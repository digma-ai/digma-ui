import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";
import type { SuccessRegistrationImageProps } from "./types";

export const SuccessRegistrationImage = ({
  basePath
}: SuccessRegistrationImageProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return <img src={`${basePath}registrationPromoSuccess_${themeKind}.svg`} />;
};
