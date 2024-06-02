export const getErrorMethodId = (sourceCodeObjectId: string) =>
  sourceCodeObjectId.split("$_$")[1];
