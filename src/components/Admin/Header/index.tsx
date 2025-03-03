import { Route, Routes } from "react-router-dom";
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
      <Route
        path={"reports/*"}
        element={
          <HeaderContent>
            <span>Reports</span>
          </HeaderContent>
        }
      />
    </Routes>
  </s.Header>
);
