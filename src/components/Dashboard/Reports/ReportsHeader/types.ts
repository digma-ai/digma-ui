import { Environment } from "../../../common/App/types";

export interface ReportsHeaderProps {
  environments: Environment[];
  services: string[];
  onFilterChanged: () => void;
}
