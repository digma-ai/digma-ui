import type { ErrorOriginService } from "../../../../../../redux/services/digmaCodeGen";
import { isObject } from "../../../../../../typeGuards/isObject";
import { isString } from "../../../../../../typeGuards/isString";

export const isServiceInfoWithName = (
  x: ErrorOriginService | null
): x is { serviceName: string } => isObject(x) && isString(x.serviceName);
