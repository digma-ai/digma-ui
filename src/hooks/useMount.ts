import { useEffect } from "react";

/** @deprecated */
export const useMount = (effect: () => void): void => {
  useEffect(effect, []);
};
