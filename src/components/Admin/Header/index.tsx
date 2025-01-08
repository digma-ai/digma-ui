import { Route, Routes } from "react-router-dom";
import { Greeting } from "./Greeting";
import * as s from "./styles";

export const Header = () => (
  <s.Header>
    <Routes>
      <Route
        path={"home"}
        element={<Greeting currentDateTime={Date.now()} />}
      />
      <Route path={"reports/*"} element={<span>Reports</span>} />
    </Routes>
  </s.Header>
);
