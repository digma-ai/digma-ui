import { LockIcon } from "../icons/12px/LockIcon";
import { InfinityIcon } from "../icons/InfinityIcon";
import { EnvironmentIconProps } from "./types";

export const EnvironmentIcon = ({ environment }: EnvironmentIconProps) => {
  if (!environment.type) {
    return null;
  }

  return environment.type === "Public" ? (
    <InfinityIcon size={12} color={"currentColor"} />
  ) : (
    <LockIcon size={12} color={"currentColor"} />
  );
};
