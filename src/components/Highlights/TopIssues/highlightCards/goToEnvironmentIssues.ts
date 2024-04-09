import { actions as globalActions } from "../../../../actions";
import {
  ChangeEnvironmentPayload,
  ChangeViewPayload,
  InsightType
} from "../../../../types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { Environment } from "../../../common/App/types";
import { trackingEvents } from "../../tracking";

export const handleEnvironmentTableRowClick = (
  environments: Environment[] | undefined,
  environmentNameToSelect: string,
  insightType: InsightType
) => {
  sendUserActionTrackingEvent(
    trackingEvents.TOP_ISSUES_CARD_TABLE_ROW_CLICKED,
    {
      insightType
    }
  );

  const environmentChangeTo = environments?.find(
    (x) => x.originalName === environmentNameToSelect
  );

  if (environmentChangeTo) {
    window.sendMessageToDigma<ChangeEnvironmentPayload>({
      action: globalActions.CHANGE_ENVIRONMENT,
      payload: {
        environment: environmentChangeTo
      }
    });

    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: "insights"
      }
    });
  }
};
