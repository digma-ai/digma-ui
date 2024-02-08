export enum View {
  ASSETS = "assets",
  INSIGHTS = "insights",
  TESTS = "tests",
  ERRORS = "errors"
}

export interface TabData {
  title: string;
  id: View;
  isSelected?: boolean;
}

export interface TabProps {
  $isSelected: boolean;
}

export interface SetViewPayload {
  view: {
    id: View;
    title: string;
  };
}
