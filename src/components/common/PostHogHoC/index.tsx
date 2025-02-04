import { PostHogProvider } from "posthog-js/react";
import type { PostHogHoCProps } from "./types";

export const PostHogHoC = ({ children, client }: PostHogHoCProps) => {
  if (!client) {
    return children;
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>;
};
