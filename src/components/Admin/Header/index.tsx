import { Greeting } from "./Greeting";
import * as s from "./styles";

export const Header = () => (
  <s.Header>
    {/* // TODO: use user email */}
    <Greeting currentDateTime={Date.now()} username={"johndoe@gmail.com"} />
  </s.Header>
);
