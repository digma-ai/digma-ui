import { Navigate, useParams } from "react-router";
import { useGetErrorEnvironmentQuery } from "../../../redux/services/digma";
import { Spinner } from "../../common/v3/Spinner";
import { TAB_IDS } from "../../Navigation/Tabs/types";
import type { TabLocation } from "../common/RepositorySidebarOverlay/types";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const ErrorLinkResolver = () => {
  const params = useParams();

  const { data } = useGetErrorEnvironmentQuery(
    {
      id: params.id ?? ""
    },
    {
      skip: !params.id,
      pollingInterval: REFRESH_INTERVAL
    }
  );

  if (!data) {
    return (
      <s.Container>
        <s.LoadingContainer>
          <Spinner size={50} />
        </s.LoadingContainer>
      </s.Container>
    );
  }

  const sidebarLocation: TabLocation = {
    id: TAB_IDS.ERRORS,
    path: params.id
  };

  if (data) {
    return (
      <Navigate
        replace={true}
        to={{
          pathname: "/home",
          search: new URLSearchParams({
            environment: data.environmentId,
            "sidebar-view": JSON.stringify(sidebarLocation)
          }).toString()
        }}
      />
    );
  }
};
