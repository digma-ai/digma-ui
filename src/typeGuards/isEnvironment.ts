import type { Environment } from "../redux/services/types";
import { isObject } from "./isObject";
import { isString } from "./isString";

export const isEnvironment = (x: unknown): x is Environment =>
  isObject(x) && isString(x.id) && isString(x.name) && isString(x.type);
