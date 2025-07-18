import { DigmaLogoThemeableIcon } from "../../../../common/icons/24px/DigmaLogoThemeableIcon";
import { MCPLogoIcon } from "../../../../common/icons/24px/MCPLogoIcon";
import { KubernetesLogoIcon } from "../../../../common/icons/25px/KubernetesLogoIcon";
import { PostgresLogoIcon } from "../../../../common/icons/25px/PostgresLogoIcon";
import { GitHubLogoIcon } from "../../../../common/icons/28px/GitHubLogoIcon";
import * as s from "./styles";
import type { MCPServerIconProps } from "./types";

export const DEFAULT_SIZE = 12; // in pixels

export const MCPServerIcon = ({
  size = DEFAULT_SIZE,
  server
}: MCPServerIconProps) => {
  if (server.icon) {
    return (
      <s.CustomImage
        $size={size}
        src={server.icon.url}
        $isActive={server.active}
      />
    );
  }

  if (server.isEditable) {
    return <MCPLogoIcon size={size} color={"currentColor"} />;
  }

  switch (server.name) {
    case "github":
      return <GitHubLogoIcon size={size} color={"currentColor"} />;
    case "postgres":
      return <PostgresLogoIcon size={size} color={"currentColor"} />;
    case "k8s":
      return <KubernetesLogoIcon size={size} color={"currentColor"} />;
    case "digma":
      return (
        <DigmaLogoThemeableIcon
          size={size}
          color={"currentColor"}
          themeKind={server.active ? "light" : "dark"}
        />
      );
    default:
      return <MCPLogoIcon size={size} color={"currentColor"} />;
  }
};
