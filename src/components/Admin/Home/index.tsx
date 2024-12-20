import { Environments } from "./Environments";
import { Overview } from "./Overview";
import { Reports } from "./Reports";
import * as s from "./styles";

export const Home = () => (
  <s.Container>
    <Overview />
    <Reports />
    <Environments />
  </s.Container>
);
