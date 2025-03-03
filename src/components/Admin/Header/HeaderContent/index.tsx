import { useAdminSelector } from "../../../../containers/Admin/hooks";
import { EnvironmentSelect } from "./EnvironmentSelect";
import { FilterMenu } from "./FilterMenu";
import * as s from "./styles";
import type { HeaderContentProps } from "./types";

export const HeaderContent = ({ children }: HeaderContentProps) => {
  const environmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );

  return (
    <s.Container>
      {children}
      {environmentId && (
        <s.FilterContainer>
          <EnvironmentSelect />
          <FilterMenu />
        </s.FilterContainer>
      )}
    </s.Container>
  );
};
