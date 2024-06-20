import { useTheme } from "styled-components";
import { getThemeKind } from "../../../common/App/styles";

export const SuccessRegistrationImage = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <img src={`/images/promotion/registrationPromoSuccess_${themeKind}.svg`} />
  );
};
