import { isObject } from "../../../../../../typeGuards/isObject";
import { isString } from "../../../../../../typeGuards/isString";
import type { ServiceInfo } from "../../../types";

export const isServiceInfoWithName = (
  x: ServiceInfo | null
): x is Omit<ServiceInfo, "serviceName"> & { serviceName: string } =>
  isObject(x) && isString(x.serviceName);
