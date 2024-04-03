export interface ErrorsPanelProps {
  errors: ErrorData[];
}

export interface ErrorData {
  title: string;
  description: string;
  id: string;
}
