import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { actions } from "./actions";
import { RecentActivityData } from "./types";

export const useRecentActivityData = () => {
  const [data, setData] = useState<RecentActivityData>();

  useEffect(() => {
    const handleRecentActivityData = (data: unknown) => {
      setData(data as RecentActivityData);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleRecentActivityData);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DATA,
        handleRecentActivityData
      );
    };
  }, []);

  return {
    recentActivityData: data
  };
};
