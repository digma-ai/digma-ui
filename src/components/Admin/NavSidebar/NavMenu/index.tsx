import { useMemo } from "react";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { GlobeIcon } from "../../../common/icons/16px/GlobeIcon";
import { HomeIcon } from "../../../common/icons/16px/HomeIcon";
import { MeterHighIcon } from "../../../common/icons/16px/MeterHighIcon";
import { NavMenuItem } from "./NavMenuItem";
import type { NavigationItem } from "./NavMenuItem/types";
import * as s from "./styles";

export const NavMenu = () => {
  const { isSandboxModeEnabled } = useConfigSelector();

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        id: "home",
        name: "Home",
        route: "/home",
        icon: <HomeIcon size={16} color={"currentColor"} />
      },
      ...(isSandboxModeEnabled
        ? []
        : [
            {
              id: "environments",
              name: "Environments",
              route: "/environments",
              icon: <GlobeIcon size={16} color={"currentColor"} />
            }
          ]),
      {
        id: "reports",
        name: "Reports",
        route: "/reports",
        icon: <MeterHighIcon size={16} color={"currentColor"} />,
        items: [
          {
            id: "codeIssues",
            name: "Code issues",
            route: "/reports/code-issues"
          }
        ]
      }
    ],
    [isSandboxModeEnabled]
  );

  return (
    <nav>
      <s.NavigationList>
        {navigationItems.map((x) => (
          <NavMenuItem key={x.id} item={x} />
        ))}
      </s.NavigationList>
    </nav>
  );
};
