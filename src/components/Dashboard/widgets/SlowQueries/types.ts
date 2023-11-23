import { Duration } from "../../../../globals";
import { ListWidgetData } from "../../ListWidget/types";

export interface SlowQueryEntry {
  spanCodeObjectId: string;
  displayName: string;
  p50: Duration | null;
  p95: Duration | null;
}

export interface SlowQueriesProps {
  environment: string;
  data?: ListWidgetData<SlowQueryEntry>;
}
