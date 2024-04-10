import { actions as globalActions } from "../../actions";
import { ChangeEnvironmentPayload, ChangeViewPayload } from "../../types";
import { Environment } from "../common/App/types";

export const handleEnvironmentTableRowClick = (
  environments: Environment[] | undefined,
  environmentNameToSelect: string
) => {
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
