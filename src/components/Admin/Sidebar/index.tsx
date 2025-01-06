import { useEffect } from "react";
import { useLogoutMutation } from "../../../redux/services/auth";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { NavMenu } from "./NavMenu";
import * as s from "./styles";

export const Sidebar = () => {
  const [logout, result] = useLogoutMutation();

  const handleLogoutButtonClick = () => {
    void logout();
  };

  useEffect(() => {
    if (result.isSuccess) {
      window.location.href = "/admin";
    }
  }, [result.isSuccess]);

  return (
    <s.Sidebar>
      <s.Logo
        // TODO: Replace with actual theme
        src={`/assets/images/digmaLogoLarge_light.svg`}
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
