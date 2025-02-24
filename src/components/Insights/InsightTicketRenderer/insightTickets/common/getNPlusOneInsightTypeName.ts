export const getNPlusOneInsightTypeName = (subType?: string) => {
  switch (subType) {
    case "repeatedQueries":
      return "Suspected N+1";
    case "repeatedInserts":
      return "Repeated Inserts";
    default:
      return "Repeated Query";
  }
};
