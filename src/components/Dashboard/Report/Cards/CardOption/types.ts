export type DiscoverdCardType =
  | "high"
  | "success"
  | "medium"
  | "low"
  | "default";

export interface CardOptionsProps {
  title: string;
  counter: number;
  type?: DiscoverdCardType;
  isActive: boolean;
  disabled?: boolean;
}

export interface ContainerProps {
  $type: DiscoverdCardType;
  $isActive: boolean;
  $disabled?: boolean;
}
