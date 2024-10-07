export interface StatusProps {
  firstSeen: string;
  lastSeen: string;
}

export enum StatusState {
  Live = "Live",
  Recent = "Recent",
  Active = "Active",
  Stale = "Stale",
  Inactive = "Inactive"
}

export interface IndicatorProps {
  $status: StatusState;
}
