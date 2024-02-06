export enum View {
  ASSETS = "assets",
  INSIGHTS = "insights",
  TESTS = "tests",
  ERRORS = "errors"
}

export interface TabData {
  label: string;
  id: View;
}

export interface TabProps {
  $isSelected: boolean;
}
