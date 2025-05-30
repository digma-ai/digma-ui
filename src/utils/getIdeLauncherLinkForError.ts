export const getIdeLauncherLinkForError = (
  errorId?: string
): string | undefined => {
  if (!errorId) {
    return;
  }

  const baseURL = `${window.location.origin}/ide-launcher`;
  const url = new URL(baseURL);

  url.searchParams.append("plugin.action", "GoToError");
  url.searchParams.append("plugin.errorId", errorId);

  return url.toString();
};
