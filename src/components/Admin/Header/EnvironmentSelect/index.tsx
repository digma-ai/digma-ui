import { useEffect, useMemo } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import { useGetEnvironmentsQuery } from "../../../../redux/services/digma";
import { setEnvironmentId } from "../../../../redux/slices/scopeSlice";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CodeIcon } from "../../../common/icons/12px/CodeIcon";
import { InfinityIcon } from "../../../common/icons/InfinityIcon";
import { sortEnvironments } from "../../../common/IssuesReport/utils";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";

export const EnvironmentSelect = () => {
  const { data: environments } = useGetEnvironmentsQuery();
  const sortedEnvironments = useMemo(
    () => sortEnvironments(environments ?? []),
    [environments]
  );
  const selectedEnvironmentId = useAdminSelector(
    (state) => state.scope.environmentId
  );
  const selectedEnvironment = useMemo(
    () =>
      sortedEnvironments?.find((x) => x.id === selectedEnvironmentId) ?? null,
    [selectedEnvironmentId, sortedEnvironments]
  );
  const dispatch = useAdminDispatch();

  const handleEnvironmentChanged = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option[0] : option;

    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_CHANGED, {
      environmentId: newItem
    });

    dispatch(setEnvironmentId(newItem));
  };

  useEffect(() => {
    if (
      sortedEnvironments &&
      sortedEnvironments.length > 0 &&
      !selectedEnvironmentId
    ) {
      dispatch(setEnvironmentId(sortedEnvironments[0].id));
    }
  }, [dispatch, sortedEnvironments, selectedEnvironmentId]);

  return (
    <s.Select
      items={sortedEnvironments.map((x) => ({
        label: x.name,
        value: x.id,
        enabled: true,
        selected: x.id === selectedEnvironmentId
      }))}
      showSelectedState={true}
      icon={(props) =>
        selectedEnvironment?.type === "Public" ? (
          <InfinityIcon {...props} size={12} />
        ) : (
          <CodeIcon {...props} size={12} />
        )
      }
      onChange={handleEnvironmentChanged}
      placeholder={selectedEnvironment?.name ?? "Select Environments"}
      disabled={sortedEnvironments.length === 0}
    />
  );
};
