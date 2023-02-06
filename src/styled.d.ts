import "styled-components";
import { Mode } from "./globals";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: Mode;
  }
}
