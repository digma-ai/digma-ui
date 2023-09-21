import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      window.clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
