export interface FilterButtonProps {
  title: string;
  isLoading?: boolean;
  selectedCount?: number;
  showCount?: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export interface ButtonProps {
  $hasSelectedItems: boolean;
  $isActive: boolean;
}
