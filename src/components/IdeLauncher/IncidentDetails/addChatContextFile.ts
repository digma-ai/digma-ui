export const addChatContextIncidentFile = (
  ideUriScheme: string,
  incidentId: string
): void => {
  const url = `${ideUriScheme}://digma.digma/chat/context/add/file/incident/${incidentId}`;
  window.open(url, "_blank", "noopener noreferrer");
};
