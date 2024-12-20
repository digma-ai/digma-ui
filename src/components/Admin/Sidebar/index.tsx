import { logger } from "../../../logging";
import { HomeIcon } from "../../common/icons/16px/HomeIcon";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import * as s from "./styles";
import type { NavigationItem } from "./types";

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    name: "Home",
    route: "/",
    icon: <HomeIcon size={16} color={"currentColor"} />,
    isActive: true
  }
];

export const Sidebar = () => {
  // TODO: Replace with actual theme kind
  const themeKind = "light";

  const handleLogoutButtonClick = () => {
    // TODO: Implement
    logger.info("Logout button clicked");
  };

  return (
    <s.Sidebar>
      <s.Logo
        src={`/assets/images/digmaLogoLarge_${themeKind}.svg`}
        alt={"Digma logotype"}
      />
      <nav>
        <s.NavigationList>
          {navigationItems.map((x) => (
            <s.NavigationListItem key={x.id} $isActive={x.isActive}>
              {x.icon}
              <span>{x.name}</span>
            </s.NavigationListItem>
          ))}
        </s.NavigationList>
      </nav>
      <s.LogoutButton onClick={handleLogoutButtonClick}>
        <LogoutIcon size={16} color={"currentColor"} />
        Logout
      </s.LogoutButton>
    </s.Sidebar>
  );
};
