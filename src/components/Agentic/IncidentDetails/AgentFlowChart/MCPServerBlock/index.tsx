import { useViewport } from "@xyflow/react";
import { DigmaLogoThemeableIcon } from "../../../../common/icons/24px/DigmaLogoThemeableIcon";
import { KubernetesLogoIcon } from "../../../../common/icons/25px/KubernetesLogoIcon";
import { PostgresLogoIcon } from "../../../../common/icons/25px/PostgresLogoIcon";
import { GitHubLogoIcon } from "../../../../common/icons/28px/GitHubLogoIcon";
import * as s from "./styles";
import type { MCPServerBlockProps, MCPServerIconProps } from "./types";

export const MCPServerIcon = ({ type, isActive }: MCPServerIconProps) => {
  const DEFAULT_SIZE = 27; // in pixels
  const viewport = useViewport();

  const size = viewport.zoom * DEFAULT_SIZE;

  switch (type) {
    case "github":
      return <GitHubLogoIcon size={size} color={"currentColor"} />;
    case "postgres":
      return <PostgresLogoIcon size={size} color={"currentColor"} />;
    case "kubernetes":
      return <KubernetesLogoIcon size={size} color={"currentColor"} />;
    case "digma":
      return (
        <DigmaLogoThemeableIcon
          size={size}
          color={"currentColor"}
          themeKind={isActive ? "light" : "dark"}
        />
      );
    default:
      return null;
  }
};

export const MCPServerBlock = ({ type, isActive }: MCPServerBlockProps) => {
  const viewport = useViewport();

  return (
    <s.MCPServerBlock $isActive={isActive} $zoomLevel={viewport.zoom}>
      <MCPServerIcon type={type} isActive={isActive} />
    </s.MCPServerBlock>
  );
};
