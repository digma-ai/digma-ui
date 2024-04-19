import { actions as globalActions } from "../../actions";
import { ChangeEnvironmentPayload, ChangeViewPayload } from "../../types";
import { View } from "../Main/types";
import { Environment } from "../common/App/types";

export const handleEnvironmentTableRowClick = (
  environments: Environment[] | undefined,
  environmentIdToSelect: string,
  viewToSelect: View
) => {
  const environmentChangeTo = environments?.find(
    (x) => x.id === environmentIdToSelect
  );

  if (environmentChangeTo) {
    window.sendMessageToDigma<ChangeEnvironmentPayload>({
      action: globalActions.CHANGE_ENVIRONMENT,
      payload: {
        environment: environmentChangeTo.id
      }
    });

    window.sendMessageToDigma<ChangeViewPayload>({
      action: globalActions.CHANGE_VIEW,
      payload: {
        view: viewToSelect
      }
    });
  }
};
