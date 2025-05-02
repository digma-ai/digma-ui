import { useGetErrorQuery } from "../../../redux/services/digma";
import { EmptyState } from "../EmptyState";
import { ErrorDetailsCardContent } from "./ErrorDetailsCardContent";
import { ErrorDetailsCardHeader } from "./ErrorDetailsCardHeader";
import * as s from "./styles";
import type { ErrorDetailsProps } from "./types";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const ErrorDetails = ({ id, onGoToAllErrors }: ErrorDetailsProps) => {
  const { data } = useGetErrorQuery(
    { id },
    {
      pollingInterval: REFRESH_INTERVAL
    }
  );

  if (!data) {
    // TODO: replace with skeletons
    return <EmptyState preset={"loading"} />;
  }

  const handleGoBack = () => {
    onGoToAllErrors();
  };

  return (
    <s.Container>
      <s.ErrorDetailsCard
        header={<ErrorDetailsCardHeader onGoBack={handleGoBack} data={data} />}
        content={<ErrorDetailsCardContent id={id} data={data} />}
      />
    </s.Container>
  );
};
