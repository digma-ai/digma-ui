import { useEffect } from "react";

/** @deprecated */
export const useMount = (effect: () => void): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};
