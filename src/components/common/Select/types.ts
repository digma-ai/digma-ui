export interface SelectThemeColors {
  menu: {
    text: {
      primary: string;
    };
    background: string;
  };
}

export interface SelectItem {
  value: string;
  label: string;
  enabled?: boolean;
  selected?: boolean;
}

export interface SelectProps {
  items: SelectItem[];
  multiselect?: boolean;
  searchable?: boolean;
  onChange: (value: string | string[]) => void;
  counts?: {
    total: number;
    filtered: number;
  };
  placeholder?: string;
}

export interface ButtonProps {
  $isOpen: boolean;
}
