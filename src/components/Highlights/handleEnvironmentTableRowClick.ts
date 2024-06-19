import { changeScope } from "../../utils/actions/changeScope";
import { Environment, Scope } from "../common/App/types";

export const handleEnvironmentTableRowClick = (
  scope: Scope | undefined,
  environments: Environment[] | undefined,
  environmentIdToSelect: string,
  viewToSelect: string
) => {
  const environmentChangeTo = environments?.find(
    (x) => x.id === environmentIdToSelect
  );

  if (environmentChangeTo) {
    changeScope({
      span: scope?.span ?? null,
      environmentId: environmentChangeTo.id,
      context: {
        event: "HIGHLIGHTS/ENVIRONMENT_TABLE_ROW_CLICKED",
        payload: { viewToSelect }
      }
    });
  }
};
