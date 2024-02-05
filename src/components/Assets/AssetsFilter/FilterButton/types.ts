export interface FilterButtonProps {
  title: string;
  isLoading?: boolean;
  isMenuOpen: boolean;
  selectedCount?: number;
  showCount?: boolean;
}

export interface ButtonProps {
  $hasSelectedItems: boolean;
}
