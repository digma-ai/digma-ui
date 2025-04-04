import { actions as globalActions } from "../../../actions";
import { DIGMA_DOCUMENTATION_URL } from "../../../constants";
import { getFeatureFlagValue } from "../../../featureFlags";
import { platform } from "../../../platform";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import type { OpenInstallationWizardPayload } from "../../../types";
import { FeatureFlag } from "../../../types";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { isDigmaEngineRunning } from "../../../utils/isDigmaEngineRunning";
import { MetricsIcon } from "../../common/icons/12px/MetricsIcon";
import { BookIcon } from "../../common/icons/16px/BookIcon";
import { DigmaLogoFlatIcon } from "../../common/icons/16px/DigmaLogoFlatIcon";
import { FourPointedStarIcon } from "../../common/icons/16px/FourPointedStarIcon";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { FourSquaresIcon } from "../../common/icons/FourSquaresIcon";
import { LocalEngineIcon } from "../../common/icons/LocalEngineIcon";
import { MenuList } from "../common/MenuList";
import type { MenuItem } from "../common/MenuList/types";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import type { OpenDashboardPayload, OpenDocumentationPayload } from "../types";
import type { KebabMenuProps } from "./types";

export const KebabMenu = ({ onClose }: KebabMenuProps) => {
  const { backendInfo, digmaStatus, environment } = useConfigSelector();
  const isDigmaMetricsVisible =
    backendInfo?.centralize &&
    getFeatureFlagValue(backendInfo, FeatureFlag.IsMetricsReportEnabled);
  const isDigmaMetricsEnabled =
    isDigmaMetricsVisible && environment?.type === "Public";

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

  const handleOpenDocsClick = () => {
    sendUserActionTrackingEvent(trackingEvents.OPEN_DOCS_CLICKED);
    openURLInDefaultBrowser(DIGMA_DOCUMENTATION_URL);
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
    onClose();
  };

  const handleReportClick = () => {
    sendUserActionTrackingEvent(trackingEvents.OPEN_DIGMA_METRICS_CLICKED);
    window.sendMessageToDigma({
      action: globalActions.OPEN_REPORT
    });

    onClose();
  };

  const handleLogoutClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOGOUT_CLICKED);
    window.sendMessageToDigma({
      action: globalActions.LOGOUT
    });
    onClose();
  };

  const items: MenuItem[] = [
    ...(platform === "JetBrains"
      ? [
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
        ]
      : [])
  ];

  if (environment && platform === "JetBrains") {
    items.push({
      id: "dashboard",
      label: "Dashboard",
      icon: <FourSquaresIcon size={16} color={"currentColor"} />,
      onClick: handleDashboardClick
    });
  }

  if (isDigmaMetricsVisible) {
    items.push({
      id: "metrics",
      label: "Digma Metrics",
      icon: <MetricsIcon color={"currentColor"} />,
      onClick: handleReportClick,
      tooltip: !isDigmaMetricsEnabled
        ? "Available for CI/Prod environments only"
        : undefined,
      isDisabled: !isDigmaMetricsEnabled
    });
  }

  if (platform === "JetBrains") {
    items.push({
      id: "digma_docs",
      label: "Digma Docs",
      icon: <BookIcon size={16} />,
      onClick: handleOpenDocsClick
    });
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
