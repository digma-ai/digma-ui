import { useContext } from "react";
import { actions as globalActions } from "../../../actions";
import {
  OpenInstallationWizardPayload,
  SetObservabilityPayload
} from "../../../types";
import { isDigmaEngineRunning } from "../../../utils/isDigmaEngineRunning";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import { DigmaLogoFlatIcon } from "../../common/icons/16px/DigmaLogoFlatIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/16px/OpenTelemetryLogoIcon";
import { MenuList } from "../common/MenuList";
import { ListItemIconContainer } from "../common/MenuList/styles";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { KebabMenuProps } from "./types";

export const KebabMenu = (props: KebabMenuProps) => {
  const config = useContext(ConfigContext);

  const handleLocalEngineClick = () => {
    sendTrackingEvent(trackingEvents.LOCAL_ENGINE_LINK_CLICKED);
    window.sendMessageToDigma<OpenInstallationWizardPayload>({
      action: globalActions.OPEN_INSTALLATION_WIZARD,
      payload: {
        skipInstallationStep: false
      }
    });
    props.onClose();
  };

  const handleObservabilityChange = (value: boolean) => {
    sendTrackingEvent(trackingEvents.OBSERVABILITY_TOGGLE_SWITCHED, { value });
    window.sendMessageToDigma<SetObservabilityPayload>({
      action: globalActions.SET_OBSERVABILITY,
      payload: {
        isObservabilityEnabled: value
      }
    });
  };

  const handleOnboardingClick = () => {
    sendTrackingEvent(trackingEvents.ONBOARDING_LINK_CLICKED);
    window.sendMessageToDigma<OpenInstallationWizardPayload>({
      action: globalActions.OPEN_INSTALLATION_WIZARD,
      payload: {
        skipInstallationStep: true
      }
    });
    props.onClose();
  };

  return (
    <Popup>
      <MenuList
        showGroupNames={false}
        showGroupDividers={true}
        items={[
          ...(isDigmaEngineRunning(config)
            ? [
                {
                  id: "localEngine",
                  groupName: "settings",
                  label: "Local Engine",
                  icon: <s.LocalEngineStatusBadge />,
                  onClick: handleLocalEngineClick
                }
              ]
            : []),
          {
            id: "observability",
            groupName: "settings",
            customContent: (
              <s.ObservabilityListItem>
                <ListItemIconContainer>
                  <OpenTelemetryLogoIcon size={16} color={"currentColor"} />
                </ListItemIconContainer>
                Observability
                <s.ObservabilityToggleSwitchContainer>
                  <ToggleSwitch
                    label={""}
                    onChange={handleObservabilityChange}
                    checked={config.isObservabilityEnabled}
                  />
                </s.ObservabilityToggleSwitchContainer>
              </s.ObservabilityListItem>
            )
          },
          {
            id: "onboarding",
            groupName: "settings",
            label: "Digma Onboarding",
            icon: <DigmaLogoFlatIcon size={16} color={"currentColor"} />,
            onClick: handleOnboardingClick
          }
        ]}
      />
    </Popup>
  );
};
