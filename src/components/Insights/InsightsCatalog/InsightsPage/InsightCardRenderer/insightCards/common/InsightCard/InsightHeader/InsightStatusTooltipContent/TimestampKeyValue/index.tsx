import { useNow } from "../../../../../../../../../../../hooks/useNow";
import { isString } from "../../../../../../../../../../../typeGuards/isString";
import { formatTimeDistance } from "../../../../../../../../../../../utils/formatTimeDistance";
import { KeyValue } from "../KeyValue";
import type { TimestampKeyValueProps } from "./types";

export const TimestampKeyValue = ({
  label,
  children
}: TimestampKeyValueProps) => {
  const now = useNow();

  return isString(children) ? (
    <KeyValue label={label}>{formatTimeDistance(children, now)}</KeyValue>
  ) : null;
};
