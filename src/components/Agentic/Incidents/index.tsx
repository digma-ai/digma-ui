import { Navigate, Outlet, useParams } from "react-router";
import { useGetIncidentsQuery } from "../../../redux/services/digma";
import { Spinner } from "../../common/v3/Spinner";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const Incidents = () => {
  const params = useParams();
  const incidentId = params.id;
  const { data, isLoading } = useGetIncidentsQuery(undefined, {
    pollingInterval: REFRESH_INTERVAL
  });

  if (!data && isLoading) {
    return (
      <s.LoadingContainer>
        <Spinner size={50} />
      </s.LoadingContainer>
    );
  }

  if (data?.items[0] && !incidentId) {
    return <Navigate replace={true} to={data.items[0].id} />;
  }

  return (
    <s.Container>
      <Outlet />
    </s.Container>
  );
};
