export const trimEndpointScheme = (route: string) => {
  const SCHEMES = [
    "epHTTP:",
    "epRPC:",
    "epConsumer:",
    "epProducer:",
    "epSpan:"
  ];

  for (const scheme of SCHEMES) {
    if (route.startsWith(scheme)) {
      return route.replace(scheme, "");
    }
  }

  return route;
};
