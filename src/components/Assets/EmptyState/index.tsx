import { actions as globalActions } from "../../../actions";
import { platform } from "../../../platform";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ChildIcon } from "../../common/icons/30px/ChildIcon";
import { CardsColoredIcon } from "../../common/icons/CardsColoredIcon";
import { EmptyState as CommonEmptyState } from "../../common/v3/EmptyState";
import type { EmptyStateProps as CommonEmptyStateProps } from "../../common/v3/EmptyState/types";
import * as s from "./styles";
import type { EmptyStatePreset, EmptyStateProps } from "./types";

const getPresetContent = (preset: EmptyStatePreset) => {
  const handleTroubleshootingLinkClick = () => {
    sendUserActionTrackingEvent(
      globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED,
      {
        origin: "assets"
      }
    );

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  const content: Record<EmptyStatePreset, CommonEmptyStateProps> = {
    updateRequired: {
      title: "We've added some new features.",
      message:
        "Please update the Digma Engine to the latest version using the action above to continue using Digma"
    },
    loading: {
      icon: <s.Spinner size={32} />,
      title: "Fetching data"
    },
    noDataYet: {
      icon: <CardsColoredIcon size={33} />,
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
    noDataForAsset: {
      icon: <CardsColoredIcon size={33} />,
      title: "No Assets",
      message:
        "No child assets found for the current scope. Add more observability to track internal functions not currently tracked."
    },
    noSearchResults: {
      icon: <CardsColoredIcon size={33} />,
      title: "No results",
      message: "Check spelling or try to search something else."
    },
    noChildAssets: {
      icon: <ChildIcon size={32} color={"currentColor"} />,
      title: "No Child Assets",
      message:
        "No child assets found for this asset. You can try\n browsing its parent spans to continue to explore the trace."
    },
    noFilteredData: {
      icon: <CardsColoredIcon size={33} />,
      title: "No results",
      message:
        "It seems there are no assets matching your selected filters at the moment"
    },
    noData: {
      message:
        "Not seeing your data here? Maybe you're missing some instrumentation!"
    }
  };

  return content[preset];
};

// TODO: move to AssetsContent
export const EmptyState = ({
  preset,
  icon,
  title,
  message,
  customContent
}: EmptyStateProps) => {
  const props: EmptyStateProps = {
    ...(preset ? getPresetContent(preset) : {}),
    ...(icon ? { icon } : {}),
    ...(title ? { title } : {}),
    ...(message ? { message } : {}),
    ...(customContent ? { customContent } : {})
  };

  return <CommonEmptyState {...props} />;
};
