import type { ErrorOriginService } from "../../../../../../redux/services/digmaCodeGen";
import { isObject } from "../../../../../../typeGuards/isObject";
import { isString } from "../../../../../../typeGuards/isString";

export const isServiceInfoWithName = (
  x: ErrorOriginService | null
): x is Omit<ErrorOriginService, "serviceName"> & { serviceName: string } =>
  isObject(x) && isString(x.serviceName);
