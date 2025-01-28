export const getTraceAttachment = (
  baseURL: string | null,
  traceId: string | null | undefined
) => {
  if (!traceId) {
    return undefined;
  }

  return {
    url: `${baseURL ?? ""}/api/traces/${traceId}?prettyPrint=true`,
    fileName: `trace-${traceId}.json`
  };
};
