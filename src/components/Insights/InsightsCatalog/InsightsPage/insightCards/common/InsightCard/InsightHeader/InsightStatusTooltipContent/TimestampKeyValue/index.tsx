import { isString } from "../../../../../../../../../../typeGuards/isString";
import { formatTimeDistance } from "../../../../../../../../../../utils/formatTimeDistance";
import { KeyValue } from "../KeyValue";
import type { TimestampKeyValueProps } from "./types";

export const TimestampKeyValue = ({
  label,
  children
}: TimestampKeyValueProps) =>
  isString(children) ? (
    <KeyValue label={label}>{formatTimeDistance(children)}</KeyValue>
  ) : null;
