export interface StatusProps {
  firstSeen: string;
  lastSeen: string;
}

export interface IndicatorProps {
  $status: "live" | "recent" | "active" | "stale" | "inactive";
}
