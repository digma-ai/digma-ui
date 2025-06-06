import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { useTheme } from "styled-components";
import { useLogoutMutation } from "../../../redux/services/auth";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../common/App/styles";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { trackingEvents } from "../tracking";
import { NavMenu } from "./NavMenu";
import { TrialPromotionCard } from "./TrialPromotionCard";
import * as s from "./styles";

export const NavSidebar = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const [logout, result] = useLogoutMutation();
  const posthog = usePostHog();

  const handleLogoLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOGO_LINK_CLICKED);
  };

  const handleLogoutButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOGOUT_BUTTON_CLICKED);
    void logout();
  };

  useEffect(() => {
    let timeoutId: number | null = null;

    if (result.isSuccess) {
      if (posthog.__loaded) {
        posthog.reset();
      }
      timeoutId = window.setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [posthog, result.isSuccess]);

  return (
    <s.Sidebar>
      <s.LogoLink to={"/"} onClick={handleLogoLinkClick}>
        <s.Logo
          src={`/assets/images/admin/digmaLogo_${themeKind}.svg`}
          alt={"Digma logotype"}
        />
      </s.LogoLink>
      <NavMenu />
      <s.Footer>
        {window.isSandboxModeEnabled === true && <TrialPromotionCard />}
        <s.LogoutButton onClick={handleLogoutButtonClick}>
          <LogoutIcon size={16} color={"currentColor"} />
          Log out
        </s.LogoutButton>
      </s.Footer>
    </s.Sidebar>
  );
};
