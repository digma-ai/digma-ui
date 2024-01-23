export interface SelectThemeColors {
  menu: {
    background: string;
  };
}

export interface SelectProps {
  items: {
    value: string;
    label: string;
    selected?: boolean;
  }[];
  multiselect?: boolean;
  searchable?: boolean;
  title?: string;
  onItemClick: (value: string) => void;
  counts?: {
    total: number;
    filtered: number;
  };
}

export interface ButtonProps {
  $isOpen: boolean;
}
