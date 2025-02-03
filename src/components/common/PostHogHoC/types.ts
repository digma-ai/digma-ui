import type { PostHog } from "posthog-js";
import type { ReactNode } from "react";

export interface PostHogHoCProps {
  children: ReactNode;
  posthogClient?: PostHog;
}
