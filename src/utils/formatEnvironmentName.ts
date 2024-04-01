export const formatEnvironmentName = (environment: string) => {
  const suffixes = ["LOCAL", "LOCAL-TESTS"];

  for (const suffix of suffixes) {
    if (environment.endsWith(`[${suffix}]`)) {
      return suffix;
    }
  }

  return environment;
};
