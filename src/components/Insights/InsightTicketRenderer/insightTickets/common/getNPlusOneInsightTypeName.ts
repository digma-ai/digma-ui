export const getNPlusOneInsightTypeName = (subType?: string) => {
  switch (subType) {
    case "repeatedQueries":
      return "N+1";
    case "repeatedInserts":
      return "Repeated inserts";
    default:
      return "Repeated Query";
  }
};
