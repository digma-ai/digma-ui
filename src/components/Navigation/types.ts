export interface TabData {
  title: string;
  id: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  hasNewData?: boolean;
}

export interface TabProps {
  $isSelected: boolean;
  $isDisabled: boolean;
}

export interface SetViewsPayload {
  views: TabData[];
}
