import { useContext } from "react";
import { actions as globalActions } from "../../../actions";
import { SetObservabilityPayload } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import { DigmaLogoFlatIcon } from "../../common/icons/16px/DigmaLogoFlatIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/16px/OpenTelemetryLogoIcon";
import { MenuList } from "../MenuList";
import { ListItemIconContainer } from "../MenuList/styles";
import { Popup } from "../Popup";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { KebabMenuProps } from "./types";

export const KebabMenu = (props: KebabMenuProps) => {
  const config = useContext(ConfigContext);

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
    window.sendMessageToDigma({
      action: globalActions.OPEN_INSTALLATION_WIZARD
    });
    props.onClose();
  };

  return (
    <Popup>
      <MenuList
        items={[
          {
            id: "observability",
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
            label: "Digma Onboarding",
            icon: <DigmaLogoFlatIcon size={16} color={"currentColor"} />,
            onClick: handleOnboardingClick
          }
        ]}
      />
    </Popup>
  );
};
