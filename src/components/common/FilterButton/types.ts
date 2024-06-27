export interface FilterButtonProps {
  title: string;
  isLoading?: boolean;
  selectedCount?: number;
  showCount?: boolean;
}

export interface ButtonProps {
  $hasSelectedItems: boolean;
}
