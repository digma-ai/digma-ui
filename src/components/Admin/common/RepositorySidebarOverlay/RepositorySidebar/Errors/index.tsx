import { useGetAboutQuery } from "../../../../../../redux/services/digma";
import * as s from "./styles";
import type { ErrorsProps } from "./types";

export const Errors = ({
  query,
  onGoToAssets,
  onScopeChange,
  selectedErrorId,
  onSelectedErrorIdChange
}: ErrorsProps) => {
  const { data: about } = useGetAboutQuery();

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
      spanCodeObjectId={query?.scopedSpanCodeObjectId}
      environmentId={query?.environment}
      errorId={selectedErrorId}
      backendInfo={about}
      selectedServices={query?.services ?? undefined}
      onScopeChange={onScopeChange}
    />
  );
};
