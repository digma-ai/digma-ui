import { useContext } from "react";
import { actions as globalActions } from "../../../actions";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { SetObservabilityPayload } from "../../../types";
import { openURLInDefaultBrowser } from "../../../utils/openURLInDefaultBrowser";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ToggleSwitch } from "../../common/ToggleSwitch";
import { DigmaLogoFlatIcon } from "../../common/icons/16px/DigmaLogoFlatIcon";
import { FourPointedStarIcon } from "../../common/icons/16px/FourPointedStar";
import { HammerIcon } from "../../common/icons/16px/HammerIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/16px/OpenTelemetryLogoIcon";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { MenuList } from "../MenuList";
import { ListItemIconContainer } from "../MenuList/styles";
import { Popup } from "../Popup";
import { OpenDocumentationPayload } from "../types";
import * as s from "./styles";
import { KebabMenuProps } from "./types";

export const KebabMenu = (props: KebabMenuProps) => {
  const config = useContext(ConfigContext);

  const handleObservabilityChange = (value: boolean) => {
    window.sendMessageToDigma<SetObservabilityPayload>({
      action: globalActions.SET_OBSERVABILITY,
      payload: {
        isObservabilityEnabled: value
      }
    });
  };

  const handleOnboardingClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_INSTALLATION_WIZARD
    });
    props.onClose();
  };

  const handleTroubleshootingClick = () => {
    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
    props.onClose();
  };

  const handleInsightsOverviewClick = () => {
    window.sendMessageToDigma<OpenDocumentationPayload>({
      action: globalActions.OPEN_DOCUMENTATION,
      payload: {
        page: "environment-types"
      }
    });
    props.onClose();
  };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
    props.onClose();
  };

  return (
    <Popup>
      <MenuList
        showGroupDividers={true}
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
            ),
            groupName: "Settings"
          },
          {
            id: "onboarding",
            label: "Digma Onboarding",
            icon: <DigmaLogoFlatIcon size={16} color={"currentColor"} />,
            onClick: handleOnboardingClick,
            groupName: "Settings"
          },
          {
            id: "insightsOverview",
            label: "Insights Overview",
            icon: <FourPointedStarIcon size={16} color="currentColor" />,
            onClick: handleInsightsOverviewClick,
            groupName: "Settings"
          },
          {
            id: "troubleshooting",
            label: "Troubleshooting",
            icon: <HammerIcon size={16} color="currentColor" />,
            onClick: handleTroubleshootingClick,
            groupName: "Settings"
          },
          {
            id: "slack",
            label: "Digma Channel",
            icon: <SlackLogoIcon size={16} color="currentColor" />,
            onClick: handleSlackLinkClick,
            groupName: "Feedback"
          }
        ]}
      />
    </Popup>
  );
};
