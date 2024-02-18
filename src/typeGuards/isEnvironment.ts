import { Environment } from "../components/common/App/types";
import { isObject } from "./isObject";
import { isString } from "./isString";

export const isEnvironment = (x: unknown): x is Environment =>
  isObject(x) &&
  isString(x.originalName) &&
  isString(x.name) &&
  isString(x.type);
