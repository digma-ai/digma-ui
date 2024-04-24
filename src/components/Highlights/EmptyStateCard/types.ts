export interface EmptyStateCardProps {
  type: "loading" | "noData" | "unlock";
  title?: string;
  text: string;
  customContent?: React.ReactNode;
}
