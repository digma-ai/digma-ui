import { useEffect } from "react";
import { useTheme } from "styled-components";
import { useLogoutMutation } from "../../../redux/services/auth";
import { getThemeKind } from "../../common/App/styles";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { NavMenu } from "./NavMenu";
import * as s from "./styles";

export const Sidebar = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const [logout, result] = useLogoutMutation();

  const handleLogoutButtonClick = () => {
    void logout();
  };

  useEffect(() => {
    if (result.isSuccess) {
      window.location.href = "/admin/";
    }
  }, [result.isSuccess]);

  return (
    <s.Sidebar>
      <s.Logo
        src={`/assets/images/admin/digmaLogo_${themeKind}.svg`}
        alt={"Digma logotype"}
      />
      <NavMenu />
      <s.LogoutButton onClick={handleLogoutButtonClick} as={"button"}>
        <LogoutIcon size={16} color={"currentColor"} />
        Log out
      </s.LogoutButton>
    </s.Sidebar>
  );
};
