import type { To } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useBrowserLocationUpdater = () => {
  const navigate = useNavigate();

  return (location: To) => {
    navigate(location, {
      replace: true,
      state: { navigatedWithCustomHistory: true }
    });
  };
};
