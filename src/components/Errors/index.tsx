import { useParams } from "react-router-dom";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useHistory } from "../Main/useHistory";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import * as s from "./styles";

export const Errors = () => {
  const { scope } = useConfigSelector();
  const spanCodeObjectId = scope?.span?.spanCodeObjectId;
  const methodId = scope?.span?.methodId ?? undefined;
  const { goTo } = useHistory();
  const params = useParams();
  const selectedErrorId = params.id;

  const handleErrorSelect = (errorId: string) => {
    goTo(errorId);
  };

  const handleGoToAllErrors = () => {
    goTo("..");
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

    return (
      <ErrorsList
        onErrorSelect={handleErrorSelect}
        spanCodeObjectId={spanCodeObjectId}
        methodId={methodId}
      />
    );
  };

  return <s.Container>{renderContent()}</s.Container>;
};
