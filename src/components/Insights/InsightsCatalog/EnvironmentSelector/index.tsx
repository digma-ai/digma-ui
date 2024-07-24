import { useState } from "react";
import useDimensions from "react-cool-dimensions";
import { useGlobalStore } from "../../../../containers/Main/stores/useGlobalStore";
import { changeScope } from "../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Environment } from "../../../common/App/types";
import { NewPopover } from "../../../common/NewPopover";
import { NewButton } from "../../../common/v3/NewButton";
import { EnvironmentMenu } from "../../../Navigation/EnvironmentBar/EnvironmentMenu";
import { trackingEvents } from "../../tracking";
import { EnvironmentChip } from "./EnvironmentChip";
import * as s from "./styles";
import { EnvironmentSelectorProps } from "./types";

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

export const EnvironmentSelector = ({
  environments
}: EnvironmentSelectorProps) => {
  const scope = useGlobalStore.use.scope();
  const environment = useGlobalStore.use.environment();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { observe, width } = useDimensions();

  if (environments.length < 2) {
    return null;
  }

  const changeEnvironment = (environmentId: string) => {
    sendUserActionTrackingEvent(trackingEvents.ENVIRONMENT_SELECTED);

    changeScope({
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

  const environmentIndex = environments.findIndex(
    (x) => x.id === environment?.id
  );

  const environmentsWithChips = getSlidingWindow(
    environments,
    environmentIndex - 1,
    ENVIRONMENT_CHIP_COUNT
  );

  const renderEnvironmentMenuButton = () => (
    <NewButton
      buttonType={"secondary"}
      onClick={handleEnvironmentMenuButtonClick}
      label={`+${environments.length - ENVIRONMENT_CHIP_COUNT}`}
    />
  );

  return (
    <s.Container ref={observe}>
      <s.EnvironmentsContainer>
        {environmentsWithChips.map((x) => (
          <EnvironmentChip
            key={x.id}
            environment={x}
            isActive={x.id === environment?.id}
            onClick={handleEnvironmentChipClick}
          />
        ))}
      </s.EnvironmentsContainer>
      {environments.length > ENVIRONMENT_CHIP_COUNT && (
        <>
          {/* // TODO: refactor this to use only popover */}
          {isMenuOpen ? (
            <NewPopover
              content={
                <EnvironmentMenu
                  environments={environments}
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
