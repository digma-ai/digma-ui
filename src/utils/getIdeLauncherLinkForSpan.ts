import type { SpanInfo } from "../types";

export const getIdeLauncherLinkForSpan = (spanInfo: SpanInfo) => {
  if (!spanInfo.uid) {
    return;
  }

  const baseURL = `${window.location.origin}/ide-launcher`;
  const url = new URL(baseURL);

  url.searchParams.append("plugin.action", "GoToSpan");
  url.searchParams.append("plugin.spanUid", spanInfo.uid);
  url.searchParams.append("plugin.targetTab", "issues");

  return url.toString();
};
