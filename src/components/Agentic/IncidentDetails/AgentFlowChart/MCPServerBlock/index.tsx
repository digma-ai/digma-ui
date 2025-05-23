import { DigmaLogoThemeableIcon } from "../../../../common/icons/24px/DigmaLogoThemeableIcon";
import { KubernetesLogoIcon } from "../../../../common/icons/25px/KubernetesLogoIcon";
import { PostgresLogoIcon } from "../../../../common/icons/25px/PostgresLogoIcon";
import { GitHubLogoIcon } from "../../../../common/icons/28px/GitHubLogoIcon";
import * as s from "./styles";
import type { MCPServerBlockProps, MCPServerIconProps } from "./types";

export const MCPServerIcon = ({ type, isActive }: MCPServerIconProps) => {
  switch (type) {
    case "github":
      return <GitHubLogoIcon size={27} color={"currentColor"} />;
    case "postgres":
      return <PostgresLogoIcon size={27} color={"currentColor"} />;
    case "kubernetes":
      return <KubernetesLogoIcon size={27} color={"currentColor"} />;
    case "digma":
      return (
        <DigmaLogoThemeableIcon
          size={27}
          color={"currentColor"}
          themeKind={isActive ? "light" : "dark"}
        />
      );
    default:
      return null;
  }
};

export const MCPServerBlock = ({ type, isActive }: MCPServerBlockProps) => {
  return (
    <s.MCPServerBlock $isActive={isActive}>
      <MCPServerIcon type={type} isActive={isActive} />
    </s.MCPServerBlock>
  );
};
