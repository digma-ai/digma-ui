import { Route, Routes } from "react-router-dom";
import { useAdminSelector } from "../../../containers/Admin/hooks";
import { EnvironmentSelect } from "./EnvironmentSelect";
import { FilterMenu } from "./FilterMenu";
import { Greeting } from "./Greeting";
import * as s from "./styles";

export const Header = () => {
  const environmentId = useAdminSelector(
    (state) => state.codeIssuesReport.selectedEnvironmentId
  );

  return (
    <s.Header>
      <Routes>
        <Route
          path={"home"}
          element={
            <s.HomeHeader>
              <Greeting currentDateTime={Date.now()} />
              {environmentId && (
                <s.FilterContainer>
                  <EnvironmentSelect />
                  <FilterMenu />
                </s.FilterContainer>
              )}
            </s.HomeHeader>
          }
        />
        <Route path={"reports/*"} element={<span>Reports</span>} />
      </Routes>
    </s.Header>
  );
};
