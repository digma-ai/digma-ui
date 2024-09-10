import { useTheme } from "styled-components";
import { getThemeKind } from "../../../../common/App/styles";

export const RegistrationPromoImage = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <img
      src={`/images/promotion/udemy/registrationPromoLogo_${themeKind}.svg`}
    />
  );
};
