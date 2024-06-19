import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { logger } from "../../logging";
import { ConfigContext } from "../common/App/ConfigContext";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import * as s from "./styles";

export const Errors = () => {
  const config = useContext(ConfigContext);
  const spanCodeObjectId = config.scope?.span?.spanCodeObjectId;
  const methodId = config?.scope?.span?.methodId;
  const navigate = useNavigate();
  const params = useParams();
  const selectedErrorId = params.id;

  logger.info("params", params);

  const handleErrorSelect = (errorId: string) => {
    const params = new URLSearchParams({ id: errorId });
    navigate({ search: params.toString() });
  };

  const handleGoToAllErrors = () => {
    navigate({ search: "" });
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
