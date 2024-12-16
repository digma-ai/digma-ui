import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import type { LiveData } from "./LiveView/types";
import { actions } from "./actions";

export const useLiveData = () => {
  const [liveData, setLiveData] = useState<LiveData>();

  const closeLiveView = (codeObjectId: string) => {
    setLiveData(undefined);
    window.sendMessageToDigma({
      action: actions.CLOSE_LIVE_VIEW,
      payload: {
        codeObjectId
      }
    });
  };

  useEffect(() => {
    const handleLiveData = (data: unknown) => {
      setLiveData(data as LiveData);
    };

    dispatcher.addActionListener(actions.SET_LIVE_DATA, handleLiveData);

    return () => {
      dispatcher.removeActionListener(actions.SET_LIVE_DATA, handleLiveData);
    };
  }, []);

  return { liveData, closeLiveView };
};
