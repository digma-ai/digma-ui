// Source: https://stackoverflow.com/a/75560169
export const roundToNonZeroDecimals = (n: number, decimals: number): number => {
  const log10 = n ? Math.floor(Math.log10(n)) : 0,
    div =
      log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

  return Math.round(n * div) / div;
};
