import { useEffect, useState } from "react";

const DEFAULT_REFRESH_INTERVAL = 10 * 1000; // 10 seconds

export const useNow = (interval: number = DEFAULT_REFRESH_INTERVAL) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return now;
};
