import { useEffect, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { LiveData } from "./LiveView/types";
import { actions } from "./actions";

export const useLiveData = (props: { liveData: LiveData | undefined }) => {
  const [liveData, setLiveData] = useState<LiveData>();

  const closeLiveSession = (codeObjectId: string) => {
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

  useEffect(() => {
    if (props.liveData) {
      setLiveData(props.liveData);
    }
  }, [props.liveData]);

  return { liveData, closeLiveSession };
};
