import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../containers/Main/stores/global/useGlobalStore";
import { useHistory } from "../Main/useHistory";
import { ErrorDetails } from "./ErrorDetails";
import { ErrorsList } from "./ErrorsList";
import * as s from "./styles";

export const Errors = () => {
  const scope = useGlobalStore().scope;
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
