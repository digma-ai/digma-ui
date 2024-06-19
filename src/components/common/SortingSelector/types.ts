export interface SortingSelectorProps {
  options: SortingOption[];
  defaultSorting: Sorting;
  onChange: (val: Sorting) => void;
}

export interface SortingOption {
  label: string;
  defaultOrder: SORTING_ORDER;
  value: string;
}

export interface SortingMenuButtonProps {
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export enum SORTING_ORDER {
  ASC = "asc",
  DESC = "desc"
}

export interface SortingMenuButtonProps {
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export interface SortingOrderIconContainerProps {
  $sortingOrder: SORTING_ORDER;
}

export interface Sorting {
  criterion: string;
  order: SORTING_ORDER;
}
