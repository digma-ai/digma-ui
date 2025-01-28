import { Route, Routes } from "react-router-dom";
import { EnvironmentSelect } from "./EnvironmentSelect";
import { Greeting } from "./Greeting";
import * as s from "./styles";

export const Header = () => (
  <s.Header>
    <Routes>
      <Route
        path={"home"}
        element={
          <s.HomeHeader>
            <Greeting currentDateTime={Date.now()} />
            <EnvironmentSelect />
          </s.HomeHeader>
        }
      />
      <Route path={"reports/*"} element={<span>Reports</span>} />
    </Routes>
  </s.Header>
);
