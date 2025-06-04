export const getIdeLauncherLinkForSpan = (
  spanUid?: string
): string | undefined => {
  if (!spanUid) {
    return;
  }

  const baseURL = `${window.location.origin}/ide-launcher`;
  const url = new URL(baseURL);

  url.searchParams.append("plugin.action", "GoToSpan");
  url.searchParams.append("plugin.spanUid", spanUid);
  url.searchParams.append("plugin.targetTab", "issues");

  return url.toString();
};
