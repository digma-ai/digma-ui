import { useGetAboutQuery } from "../../../../../../redux/services/digma";
import { useConfigSelector } from "../../../../../../store/config/useConfigSelector";
import * as s from "./styles";
import type { ErrorsProps } from "./types";

export const Errors = ({
  onGoToAssets,
  onScopeChange,
  selectedErrorId,
  onSelectedErrorIdChange
}: ErrorsProps) => {
  const { data: about } = useGetAboutQuery();
  const { selectedServices, scope, environment } = useConfigSelector();

  const handleGoToErrors = () => {
    onSelectedErrorIdChange(undefined);
  };

  const handleErrorSelect = (errorId: string) => {
    onSelectedErrorIdChange(errorId);
  };

  return (
    <s.Content
      onGoToAssets={onGoToAssets}
      onGoToErrors={handleGoToErrors}
      onErrorSelect={handleErrorSelect}
      spanCodeObjectId={scope?.span?.spanCodeObjectId}
      environmentId={environment?.id}
      errorId={selectedErrorId}
      backendInfo={about}
      selectedServices={selectedServices ?? undefined}
      onScopeChange={onScopeChange}
    />
  );
};
