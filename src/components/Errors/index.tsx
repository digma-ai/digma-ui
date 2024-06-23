import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistoryNavigation } from "../Main/useHistoryNavigation";
import { ConfigContext } from "../common/App/ConfigContext";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import * as s from "./styles";

export const Errors = () => {
  const config = useContext(ConfigContext);
  const spanCodeObjectId = config.scope?.span?.spanCodeObjectId;
  const methodId = config?.scope?.span?.methodId;
  const { goTo } = useHistoryNavigation();
  const params = useParams();
  const selectedErrorId = params.id;

  const handleErrorSelect = (errorId: string) => {
    goTo(errorId);
  };

  const handleGoToAllErrors = () => {
    goTo(".");
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
