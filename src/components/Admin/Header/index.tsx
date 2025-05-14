import { Route, Routes } from "react-router";
import { CreateEnvironmentButton } from "./CreateEnvironmentButton";
import { Greeting } from "./Greeting";
import { HeaderContent } from "./HeaderContent";
import { FilterToolbar } from "./HeaderContent/FilterToolbar";
import * as s from "./styles";

export const Header = () => (
  <s.Header>
    <Routes>
      <Route
        path={"home"}
        element={
          <HeaderContent toolbarContent={<FilterToolbar />}>
            <Greeting />
          </HeaderContent>
        }
      />
      <Route path={"reports"}>
        <Route
          path={"*"}
          element={
            <HeaderContent toolbarContent={<FilterToolbar />}>
              <span>Reports</span>
            </HeaderContent>
          }
        />
      </Route>
      <Route
        path={"environments"}
        element={
          <HeaderContent toolbarContent={<CreateEnvironmentButton />}>
            <span>Environments</span>
          </HeaderContent>
        }
      />
      <Route path={"troubleshooting"}>
        <Route
          path={"rejected-traces"}
          element={
            <HeaderContent>
              <span>Rejected Traces</span>
            </HeaderContent>
          }
        />
        <Route
          path={"*"}
          element={
            <HeaderContent>
              <span>Troubleshooting</span>
            </HeaderContent>
          }
        />
      </Route>
    </Routes>
  </s.Header>
);
