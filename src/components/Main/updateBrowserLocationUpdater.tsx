import type { To } from "react-router";
import { useNavigate } from "react-router";

export const useBrowserLocationUpdater = () => {
  const navigate = useNavigate();

  return (location: To) => {
    void navigate(location, {
      replace: true,
      state: { navigatedWithCustomHistory: true }
    });
  };
};
