import type { Environment } from "../../redux/services/types";
import type { ScopeChangeEvent } from "../../types";
import { changeScope } from "../../utils/actions/changeScope";
import type { Scope } from "../common/App/types";

export const handleEnvironmentTableRowClick = (
  scope: Scope | null,
  environments: Environment[] | null,
  environmentIdToSelect: string,
  changeScopeEvent: ScopeChangeEvent
) => {
  const environmentChangeTo = environments?.find(
    (x) => x.id === environmentIdToSelect
  );

  if (environmentChangeTo) {
    changeScope({
      span: scope?.span
        ? {
            spanCodeObjectId: scope.span.spanCodeObjectId
          }
        : null,
      environmentId: environmentChangeTo.id,
      context: {
        event: changeScopeEvent
      }
    });
  }
};
