import { useTheme, type DefaultTheme } from "styled-components";
import { actions as globalActions } from "../../../actions";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { platform } from "../../../platform";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../common/App/styles";
import { DocumentWithMagnifierIcon } from "../../common/icons/DocumentWithMagnifierIcon";
import { LightBulbSmallCrossedIcon } from "../../common/icons/LightBulbSmallCrossedIcon";
import { LightBulbSmallIcon } from "../../common/icons/LightBulbSmallIcon";
import { OpenTelemetryLogoCrossedSmallIcon } from "../../common/icons/OpenTelemetryLogoCrossedSmallIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { EmptyState as CommonEmptyState } from "../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";
import * as s from "./styles";
import type { EmptyStatePreset, EmptyStateProps } from "./types";

const getPresetContent = (preset: EmptyStatePreset, theme: DefaultTheme) => {
  const themeKind = getThemeKind(theme);

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleTroubleshootingLinkClick = () => {
    sendUserActionTrackingEvent(
      globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED,
      {
        origin: "insights"
      }
    );

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    nothingToShow: {
      icon: <DocumentWithMagnifierIcon size={32} themeKind={themeKind} />,
      title: "Nothing to show",
      message:
        "Navigate to any code file in your workspace,\n or click a recent activity,\n to see runtime data and insights here.",
      customContent: (
        <s.SlackLink onClick={handleSlackLinkClick}>
          <SlackLogoIcon size={14} />
          Join Our Slack Channel for Support
        </s.SlackLink>
      )
    },
    noDataYet: {
      title: "No data yet",
      message:
        "Trigger actions that call this application to learn more about its runtime behavior",
      customContent:
        platform === "JetBrains" ? (
          <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
            Not seeing your application data?
          </s.TroubleshootingLink>
        ) : null
    },
    loading: {
      icon: <s.Spinner size={32} />,
      title: "Fetching data"
    },
    noInsights: {
      icon: <LightBulbSmallCrossedIcon size={32} themeKind={themeKind} />,
      title: "No insights"
    },
    processing: {
      icon: <LightBulbSmallIcon size={32} color={"currentColor"} />,
      title: "Processing insights..."
    },
    noObservability: {
      icon: (
        <OpenTelemetryLogoCrossedSmallIcon size={32} color={"currentColor"} />
      ),
      title: "No observability",
      message:
        " Add an annotation to observe this method and collect data about its runtime behavior"
    }
  };

  return content[preset];
};

export const EmptyState = ({
  preset,
  icon,
  title,
  message,
  customContent
}: EmptyStateProps) => {
  const theme = useTheme();

  const props: EmptyStateProps = {
    ...(preset ? getPresetContent(preset, theme) : {}),
    ...(icon ? { icon } : {}),
    ...(title ? { title } : {}),
    ...(message ? { message } : {}),
    ...(customContent ? { customContent } : {})
  };

  return <CommonEmptyState {...props} />;
};
