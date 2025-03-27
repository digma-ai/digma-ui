import type { SortingOrder } from "../../../redux/services/types";

export interface SortingSelectorProps<T> {
  options: SortingOption<T>[];
  defaultSorting: Sorting<T>;
  onChange: (val: Sorting<T>) => void;
}

export interface SortingOption<T> {
  label: string;
  defaultOrder: SortingOrder;
  value: T;
}

export interface SortingMenuButtonProps {
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export interface SortingMenuButtonProps {
  $isOpen: boolean;
}

export interface SortingOrderOptionProps {
  $selected: boolean;
}

export interface SortingOrderIconContainerProps {
  $sortingOrder: SortingOrder;
}

export interface Sorting<T> {
  criterion: T;
  order: SortingOrder;
}
