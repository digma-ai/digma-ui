import { useEffect, useState } from "react";

export const useLoading = (
  defaultValue: boolean,
  cancelTimeoutMs = 30 * 1000
): [boolean, (va: boolean) => void] => {
  const [isLoading, setIsLoading] = useState(defaultValue);

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    const timerId = setTimeout(() => setIsLoading(false), cancelTimeoutMs);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return [isLoading, setIsLoading];
};
