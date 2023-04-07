export interface LoaderProps {
  size?: number;
  themeKind?: "light" | "dark";
  status: "pending" | "success" | "failure";
}
