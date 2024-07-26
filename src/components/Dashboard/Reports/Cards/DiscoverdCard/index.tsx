import { ReportCard } from "../../ReportCard";
import { DiscoverdCardProps } from "./types";

export const DiscoverdCard = ({ title }: DiscoverdCardProps) => {
  return <ReportCard header={title} content={"empty"} />;
};
