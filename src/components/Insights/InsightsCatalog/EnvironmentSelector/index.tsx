import { useMemo, useState } from "react";
import useDimensions from "react-cool-dimensions";
import type { Environment } from "../../../../redux/services/types";
import { useConfigSelector } from "../../../../store/config/useConfigSelector";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { NewPopover } from "../../../common/NewPopover";
import { NewButton } from "../../../common/v3/NewButton";
import { EnvironmentMenu } from "../../../Navigation/EnvironmentBar/EnvironmentMenu";
import { trackingEvents } from "../../tracking";
import { EnvironmentChip } from "./EnvironmentChip";
import { getMostCriticalIssueCount } from "./getMostCriticalIssueCount";
import * as s from "./styles";
import type { EnvironmentSelectorProps, SelectorEnvironment } from "./types";

const ENVIRONMENT_CHIP_COUNT = 3;

const getSlidingWindow = <T,>(arr: T[], start: number, length: number) => {
  const result = [];
  const arrLength = arr.length;

  for (let i = 0; i < length; i++) {
    const currentIndex = (start + i + arrLength) % arrLength;
    result.push(arr[currentIndex]);
  }

  return result;
};

const sortEnvironmentsByCriticalIssues = (
  a: SelectorEnvironment,
  b: SelectorEnvironment
) => {
  const aCount = getMostCriticalIssueCount(a.issueCounts);
  const bCount = getMostCriticalIssueCount(b.issueCounts);

  if (aCount && !bCount) {
    return -1;
  }

  if (!aCount && bCount) {
    return 1;
  }

  if (aCount && bCount) {
    if (aCount.criticality === bCount.criticality) {
      return (
        bCount.count - aCount.count ||
        a.environment.name.localeCompare(b.environment.name)
      );
    }

    return bCount.criticality - aCount.criticality;
  }

  return 0;
};

export const EnvironmentSelector = ({
  environments,
  onScopeChange
}: EnvironmentSelectorProps) => {
  const { scope, environment } = useConfigSelector();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { observe, width } = useDimensions();
  const sortedEnvironmentsByCriticalIssues = useMemo(
    () => [...environments].sort(sortEnvironmentsByCriticalIssues),
    [environments]
  );
  const sortedEnvironmentsByName = useMemo(
    () =>
      [...environments].sort((a, b) =>
        a.environment.name.localeCompare(b.environment.name)
      ),
    [environments]
  );

  const changeEnvironment = (environmentId: string) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_SELECTED);

    onScopeChange({
      span: scope?.span
        ? {
            spanCodeObjectId: scope.span.spanCodeObjectId
          }
        : null,
      environmentId: environmentId
    });
  };

  const handleMenuItemClick = (environment: Environment) => {
    setIsMenuOpen(false);
    changeEnvironment(environment.id);
  };

  const handleEnvironmentChipClick = (environmentId: string) => {
    changeEnvironment(environmentId);
  };

  const handleEnvironmentMenuOpenChange = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleEnvironmentMenuButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_MENU_BUTTON_CLICKED);

    setIsMenuOpen(!isMenuOpen);
  };

  const environmentIndex = sortedEnvironmentsByCriticalIssues.findIndex(
    (x) => x.environment.id === environment?.id
  );

  const environmentsWithChips =
    sortedEnvironmentsByCriticalIssues.length > ENVIRONMENT_CHIP_COUNT
      ? getSlidingWindow(
          sortedEnvironmentsByCriticalIssues,
          environmentIndex - 1,
          ENVIRONMENT_CHIP_COUNT
        )
      : sortedEnvironmentsByCriticalIssues;

  const renderEnvironmentMenuButton = () => (
    <NewButton
      buttonType={"secondary"}
      onClick={handleEnvironmentMenuButtonClick}
      label={`+${
        sortedEnvironmentsByCriticalIssues.length - ENVIRONMENT_CHIP_COUNT
      }`}
    />
  );

  return (
    <s.Container ref={observe}>
      <s.EnvironmentsContainer>
        {environmentsWithChips.map((x) => (
          <EnvironmentChip
            key={x.environment.id}
            environment={x.environment}
            isActive={x.environment.id === environment?.id}
            onClick={handleEnvironmentChipClick}
            issueCounts={x.issueCounts}
          />
        ))}
      </s.EnvironmentsContainer>
      {sortedEnvironmentsByName.length > ENVIRONMENT_CHIP_COUNT && (
        <>
          {/* // TODO: refactor this to use only popover */}
          {isMenuOpen ? (
            <NewPopover
              content={
                <EnvironmentMenu
                  selectedEnvironment={environment}
                  environments={sortedEnvironmentsByName.map(
                    (x) => x.environment
                  )}
                  onMenuItemClick={handleMenuItemClick}
                />
              }
              onOpenChange={handleEnvironmentMenuOpenChange}
              isOpen={isMenuOpen}
              placement={"bottom-end"}
              width={width}
            >
              {renderEnvironmentMenuButton()}
            </NewPopover>
          ) : (
            renderEnvironmentMenuButton()
          )}
        </>
      )}
    </s.Container>
  );
};
