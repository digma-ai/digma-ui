import { DesktopIcon } from "../icons/DesktopIcon";
import { InfinityIcon } from "../icons/InfinityIcon";
import { EnvironmentIconProps } from "./types";

export const EnvironmentIcon = (props: EnvironmentIconProps) => {
  if (!props.environment.type) {
    return null;
  }

  return props.environment.id === props.environment.id ? (
    <InfinityIcon size={16} color={"currentColor"} />
  ) : (
    <DesktopIcon size={16} color={"currentColor"} />
  );
};
