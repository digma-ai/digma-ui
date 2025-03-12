import { LockIcon } from "../icons/12px/LockIcon";
import { InfinityIcon } from "../icons/InfinityIcon";
import type { EnvironmentIconProps } from "./types";

export const EnvironmentIcon = ({
  environment,
  size = 12
}: EnvironmentIconProps) => {
  return environment.type === "Public" ? (
    <InfinityIcon size={size} color={"currentColor"} />
  ) : (
    <LockIcon size={size} color={"currentColor"} />
  );
};
