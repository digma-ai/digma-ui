export const getWebAdminLinkForError = (
  errorId?: string
): string | undefined => {
  if (!errorId) {
    return;
  }

  const baseURL = `${window.location.origin}/admin/navigate/errors/${errorId}`;
  const url = new URL(baseURL);

  return url.toString();
};
