import type { Error } from "../types";

export interface ErrorCardProps {
  data: Error;
  onClick: (id: string) => void;
}
