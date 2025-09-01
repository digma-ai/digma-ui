import { useMemo, type MouseEvent } from "react";
import { getFeatureFlagValue } from "../../../../featureFlags";
import { useGetAboutQuery } from "../../../../redux/services/digma";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { FeatureFlag } from "../../../../types";
import { GlobeIcon } from "../../../common/icons/16px/GlobeIcon";
import { HomeIcon } from "../../../common/icons/16px/HomeIcon";
import { MeterHighIcon } from "../../../common/icons/16px/MeterHighIcon";
import { NavMenuItem } from "./NavMenuItem";
import type { NavigationItem } from "./NavMenuItem/types";
import * as s from "./styles";

export const NavMenu = () => {
  const { data: about } = useGetAboutQuery();

  const isTroubleshootingEnabled = getFeatureFlagValue(
    about,
    FeatureFlag.AreBlockedTracesEnabled
  );

  const { isAgenticEnabled } = useConfigSelector();

  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        id: "home",
        name: "Home",
        route: "/home",
        icon: <HomeIcon size={16} color={"currentColor"} />
      },
      ...(window.isSandboxModeEnabled === true
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
      },
      ...(isTroubleshootingEnabled
        ? [
            {
              id: "troubleshooting",
              name: "Troubleshooting",
              route: "/troubleshooting",
              items: [
                {
                  id: "rejectedTraces",
                  name: "Rejected traces",
                  route: "/troubleshooting/rejected-traces"
                }
              ]
            }
          ]
        : []),
      ...(isAgenticEnabled
        ? [
            {
              id: "aiSre",
              name: "AI SRE",
              route: `${window.location.origin}/agentic`,
              onClick: (e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                window.open(
                  `${window.location.origin}/agentic`,
                  "_blank",
                  "noopener noreferrer"
                );
              }
            }
          ]
        : [])
    ],
    [isTroubleshootingEnabled, isAgenticEnabled]
  );

  return (
    <nav>
      <s.NavigationList>
        {navigationItems.map((x) => (
          <NavMenuItem key={x.id} item={x} onClick={x.onClick} />
        ))}
      </s.NavigationList>
    </nav>
  );
};
