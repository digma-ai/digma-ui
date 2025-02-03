import { PostHogProvider } from "posthog-js/react";
import type { PostHogHoCProps } from "./types";

export const PostHogHoC = ({ children, posthogClient }: PostHogHoCProps) => {
  if (!posthogClient) {
    return children;
  }

  return <PostHogProvider client={posthogClient}>{children}</PostHogProvider>;
};
