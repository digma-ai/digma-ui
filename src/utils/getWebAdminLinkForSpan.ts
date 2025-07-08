export const getWebAdminLinkForSpan = (
  spanUid?: string
): string | undefined => {
  if (!spanUid) {
    return;
  }

  const baseURL = `${window.location.origin}/admin/navigate/${spanUid}`;
  const url = new URL(baseURL);

  return url.toString();
};
