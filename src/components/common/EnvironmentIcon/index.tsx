import { LockIcon } from "../icons/12px/LockIcon";
import { InfinityIcon } from "../icons/InfinityIcon";
import { EnvironmentIconProps } from "./types";

export const EnvironmentIcon = (props: EnvironmentIconProps) => {
  if (!props.environment.type) {
    return null;
  }

  return props.environment.type === "Public" ? (
    <InfinityIcon size={12} color={"currentColor"} />
  ) : (
    <LockIcon size={12} color={"currentColor"} />
  );
};
