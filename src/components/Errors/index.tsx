import { useState } from "react";
import { actions as globalActions } from "../../actions";
import { ROUTES } from "../../constants";
import { ChangeViewPayload } from "../../types";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import * as s from "./styles";
import { ErrorsProps } from "./types";

export const Errors = ({ errorId }: ErrorsProps) => {
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(
    errorId || null
  );

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
    return <ErrorsList onErrorSelect={handleErrorSelect} />;
  };

  return <s.Container>{renderContent()}</s.Container>;
};
