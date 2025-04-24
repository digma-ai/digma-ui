import { Route, Routes } from "react-router";
import { Greeting } from "./Greeting";
import { HeaderContent } from "./HeaderContent";
import * as s from "./styles";

export const Header = () => (
  <s.Header>
    <Routes>
      <Route
        path={"home"}
        element={
          <HeaderContent>
            <Greeting />
          </HeaderContent>
        }
      />
      <Route path={"reports"}>
        <Route
          path={"*"}
          element={
            <HeaderContent>
              <span>Reports</span>
            </HeaderContent>
          }
        />
      </Route>
    </Routes>
  </s.Header>
);
