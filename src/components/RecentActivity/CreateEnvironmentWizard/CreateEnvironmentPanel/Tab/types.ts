export interface TabProps {
  index: number;
  name: string;
  state: TabState;
}
export type TabState = "active" | "confirmed" | "pending";

export interface IndexProps {
  $state: TabState;
}

export interface NameProps {
  $isActive: boolean;
}
