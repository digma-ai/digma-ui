import { useEffect, useState } from "react";

const MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const useColorScheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia(MEDIA_QUERY).matches
  );

  useEffect(() => {
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };

    const media = window.matchMedia(MEDIA_QUERY);

    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return isDarkTheme ? "dark" : "light";
};
