import { useAdminSelector } from "../../../../../containers/Admin/hooks";
import { EnvironmentSelect } from "../EnvironmentSelect";
import { FilterMenu } from "../FilterMenu";

export const FilterToolbar = () => {
  const environmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );
  return (
    environmentId && (
      <>
        <EnvironmentSelect />
        <FilterMenu />
      </>
    )
  );
};
