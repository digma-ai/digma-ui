import { BackendInfo } from "../components/common/App/types";

export const areBackendInfosEqual = (
  a: BackendInfo | null,
  b: BackendInfo | null
): boolean => {
  if (a === b || (!a && !b)) {
    return true;
  }

  return Boolean(
    a &&
      b &&
      a.applicationVersion === b.applicationVersion &&
      a.centralize === b.centralize &&
      a.deploymentType === b.deploymentType
  );
};
