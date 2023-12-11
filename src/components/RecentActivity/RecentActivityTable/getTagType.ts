import { TagType } from "../../common/Tag/types";

export const getTagType = (importance: number): TagType | undefined => {
  if (importance === 0) {
    return undefined;
  }

  if (importance < 3) {
    return "highSeverity";
  }
  if (importance < 5) {
    return "mediumSeverity";
  }
  if (importance < 7) {
    return "lowSeverity";
  }

  return "success";
};
