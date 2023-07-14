export type LoaderStatus = "pending" | "success" | "failure";

export interface LoaderProps {
  size?: number;
  themeKind?: "light" | "dark";
  status: LoaderStatus;
}
