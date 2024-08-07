import { actions as globalActions } from "../../../actions";
import { useGlobalStore } from "../../../containers/Main/stores/useGlobalStore";
import { OpenInstallationWizardPayload } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { isDigmaEngineRunning } from "../../../utils/isDigmaEngineRunning";
import { DigmaLogoFlatIcon } from "../../common/icons/16px/DigmaLogoFlatIcon";
import { FourPointedStarIcon } from "../../common/icons/16px/FourPointedStarIcon";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { FourSquaresIcon } from "../../common/icons/FourSquaresIcon";
import { LocalEngineIcon } from "../../common/icons/LocalEngineIcon";
import { MenuList } from "../common/MenuList";
import { MenuItem } from "../common/MenuList/types";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import { OpenDashboardPayload, OpenDocumentationPayload } from "../types";
import { KebabMenuProps } from "./types";

export const KebabMenu = ({ onClose }: KebabMenuProps) => {
  const backendInfo = useGlobalStore.use.backendInfo();
  const digmaStatus = useGlobalStore.use.digmaStatus();
  const environment = useGlobalStore.use.environment();

  const handleOnboardingClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ONBOARDING_LINK_CLICKED);
    window.sendMessageToDigma<OpenInstallationWizardPayload>({
      action: globalActions.OPEN_INSTALLATION_WIZARD,
      payload: {
        skipInstallationStep: true
      }
    });
    onClose();
  };

  const handleLocalEngineClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOCAL_ENGINE_LINK_CLICKED);
    window.sendMessageToDigma<OpenInstallationWizardPayload>({
      action: globalActions.OPEN_INSTALLATION_WIZARD,
      payload: {
        skipInstallationStep: false
      }
    });
    onClose();
  };

  const handleInsightsOverviewClick = () => {
    window.sendMessageToDigma<OpenDocumentationPayload>({
      action: globalActions.OPEN_DOCUMENTATION,
      payload: {
        page: "environment-types"
      }
    });
    onClose();
  };

  const handleDashboardClick = () => {
    if (environment) {
      sendUserActionTrackingEvent(trackingEvents.DASHBOARD_LINK_CLICKED);
      window.sendMessageToDigma<OpenDashboardPayload>({
        action: globalActions.OPEN_DASHBOARD,
        payload: {
          environment: environment.id
        }
      });
    }
  };

  // const handleReportClick = () => {
  //   window.sendMessageToDigma({
  //     action: globalActions.OPEN_REPORT
  //   });
  //   onClose();
  // };

  const handleLogoutClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOGOUT_CLICKED);
    window.sendMessageToDigma({
      action: globalActions.LOGOUT
    });
    onClose();
  };

  const items: MenuItem[] = [
    {
      id: "onboarding",
      label: "Digma Onboarding",
      icon: <DigmaLogoFlatIcon size={16} color={"currentColor"} />,
      onClick: handleOnboardingClick
    },
    {
      id: "localEngine",
      label: "Local Engine",
      icon: (
        <LocalEngineIcon
          size={16}
          isActive={isDigmaEngineRunning(digmaStatus)}
        />
      ),
      onClick: handleLocalEngineClick
    },
    {
      id: "insightsOverview",
      label: "Insights Overview",
      icon: <FourPointedStarIcon size={16} color={"currentColor"} />,
      onClick: handleInsightsOverviewClick
    }
  ];

  if (environment) {
    items.push({
      id: "dashboard",
      label: "Dashboard",
      icon: <FourSquaresIcon size={16} color={"currentColor"} />,
      onClick: handleDashboardClick
    });

    // if (getFeatureFlagValue(backendInfo, FeatureFlag.IS_REPORT_ENABLED)) {
    //   items.push({
    //     id: "report",
    //     label: "Open Report",
    //     icon: <FourSquaresIcon size={16} color={"currentColor"} />,
    //     onClick: handleReportClick
    //   });
    // }
  }

  if (backendInfo?.centralize) {
    items.push({
      id: "logout",
      label: "Logout",
      icon: <LogoutIcon size={16} color={"currentColor"} />,
      onClick: handleLogoutClick
    });
  }

  return (
    <Popup>
      <MenuList showGroupNames={false} showGroupDividers={true} items={items} />
    </Popup>
  );
};
