import { useContext, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { ROUTES } from "../../constants";
import { ChangeViewPayload } from "../../types";
import { ConfigContext } from "../common/App/ConfigContext";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import * as s from "./styles";
import { ErrorsProps } from "./types";

export const Errors = ({ errorId }: ErrorsProps) => {
  const config = useContext(ConfigContext);
  const spanCodeObjectId = config.scope?.span?.spanCodeObjectId;
  const methodId = config?.scope?.span?.methodId;

  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(
    errorId || null
  );

  useEffect(() => {
    setSelectedErrorId(errorId || null);
  }, [errorId]);

  const handleErrorSelect = (errorId: string) => {
    setSelectedErrorId(errorId);
    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: `${ROUTES.ERRORS}/${errorId}`
      }
    });
  };

  const handleGoToAllErrors = () => {
    setSelectedErrorId(null);
    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: ROUTES.ERRORS
      }
    });
  };

  const renderContent = () => {
    if (selectedErrorId) {
      return (
        <ErrorDetails
          id={selectedErrorId}
          onGoToAllErrors={handleGoToAllErrors}
        />
      );
    }

    if (spanCodeObjectId) {
      return (
        <ErrorsList
          onErrorSelect={handleErrorSelect}
          spanCodeObjectId={spanCodeObjectId}
          methodId={methodId}
        />
      );
    }

    return null;
  };

  return <s.Container>{renderContent()}</s.Container>;
};
