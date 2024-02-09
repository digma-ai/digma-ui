import { useEffect, useState } from "react";

export const useLoading = (defaultValue: boolean, cancelTimeoutSec = 30) => {
  const [isLoading, setIsLoading] = useState(defaultValue);

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    const timerId = setTimeout(
      () => setIsLoading(false),
      cancelTimeoutSec * 1000
    );
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return { isLoading, setIsLoading };
};
