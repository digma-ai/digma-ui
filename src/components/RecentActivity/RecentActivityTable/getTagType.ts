import { TagType } from "../../common/Tag/types";

export const getTagType = (criticality: number): TagType => {
  if (criticality < 0.2) {
    return "lowSeverity";
  }

  if (criticality < 0.6) {
    return "mediumSeverity";
  }

  return "highSeverity";
};
