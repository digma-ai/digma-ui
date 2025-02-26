import { useEffect, useMemo, useState } from "react";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../../../containers/Admin/hooks";
import { useGetEnvironmentsQuery } from "../../../../redux/services/digma";
import { setSelectedEnvironmentId } from "../../../../redux/slices/issuesReportSlice";
import { setEnvironmentId } from "../../../../redux/slices/scopeSlice";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { EnvironmentIcon } from "../../../common/EnvironmentIcon";
import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { sortEnvironments } from "../../../common/IssuesReport/utils";
import { NewPopover } from "../../../common/NewPopover";
import { Tooltip } from "../../../common/v3/Tooltip";
import { EnvironmentMenu } from "../../../Navigation/EnvironmentBar/EnvironmentMenu";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";

export const EnvironmentSelect = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: environments } = useGetEnvironmentsQuery();
  const sortedEnvironments = useMemo(
    () => sortEnvironments(environments ?? []),
    [environments]
  );
  const selectedEnvironmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  const selectedEnvironment = useMemo(
    () =>
      sortedEnvironments?.find((x) => x.id === selectedEnvironmentId) ?? null,
    [selectedEnvironmentId, sortedEnvironments]
  );
  const dispatch = useAdminDispatch();

  const handleEnvironmentMenuOpenChange = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleEnvironmentChange = (option: string | string[]) => {
    const newItem = Array.isArray(option) ? option[0] : option;

    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_CHANGED);

    dispatch(setSelectedEnvironmentId(newItem));
    setIsMenuOpen(false);
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
    <NewPopover
      content={
        <EnvironmentMenu
          selectedEnvironment={selectedEnvironment}
          environments={sortedEnvironments}
          onMenuItemClick={(environment) => {
            handleEnvironmentChange(environment.id);
          }}
        />
      }
      onOpenChange={handleEnvironmentMenuOpenChange}
      isOpen={isMenuOpen}
      placement={"bottom"}
      sameWidth={true}
    >
      <div>
        <Tooltip title={selectedEnvironment?.name}>
          <s.Button>
            {selectedEnvironment && (
              <EnvironmentIcon environment={selectedEnvironment} size={16} />
            )}
            <s.EnvironmentName>{selectedEnvironment?.name}</s.EnvironmentName>
            <s.ChevronIconContainer>
              <ChevronIcon
                direction={isMenuOpen ? Direction.UP : Direction.DOWN}
                color={"currentColor"}
                size={16}
              />
            </s.ChevronIconContainer>
          </s.Button>
        </Tooltip>
      </div>
    </NewPopover>
  );
};
