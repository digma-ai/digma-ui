import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { SpanInfo } from "../../../../types";
import { actions } from "../../actions";
import { CodeLocationsData } from "../types";
import { useLoading } from "./useLoading";

export const useCodeLocations = (spanInfo: SpanInfo | null) => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);

  useEffect(() => {
    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );
    };
  }, []);

  useEffect(() => {
    const spanCodeObjectId = spanInfo?.spanCodeObjectId;
    const methodCodeObjectId = spanInfo?.methodCodeObjectId || undefined;

    setIsLoading(true);
    window.sendMessageToDigma({
      action: actions.GET_CODE_LOCATIONS,
      payload: {
        spanCodeObjectId,
        methodCodeObjectId
      }
    });
  }, [spanInfo]);
  return { isLoading, codeLocations };
};
