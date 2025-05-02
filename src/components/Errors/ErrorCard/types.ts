import type { Error } from "../../../redux/services/types";

export interface ErrorCardProps {
  data: Error;
  onClick: (id: string) => void;
}
