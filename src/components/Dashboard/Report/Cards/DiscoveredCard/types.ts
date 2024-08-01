import { DiscoverdCardType } from "../CardOption/types";

export interface DiscoveredCardProps {
  options: OptionConfig[][];
  title: string;
}

export interface OptionConfig {
  title: string;
  counter: number;
  type?: DiscoverdCardType;
}
