import { Outlet } from "react-router";
import * as s from "./styles";

export const IncidentsContainer = () => (
  <s.Container>
    <Outlet />
  </s.Container>
);
