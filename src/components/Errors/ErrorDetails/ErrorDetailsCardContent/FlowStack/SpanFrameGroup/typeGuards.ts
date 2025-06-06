import type { ErrorOriginService } from "../../../../../../redux/services/types";
import { isObject } from "../../../../../../typeGuards/isObject";
import { isString } from "../../../../../../typeGuards/isString";

export const isServiceInfoWithName = (
  x: ErrorOriginService
): x is Omit<ErrorOriginService, "serviceName"> & { serviceName: string } =>
  isObject(x) && isString(x.serviceName);
