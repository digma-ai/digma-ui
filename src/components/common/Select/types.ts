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
  disabled?: boolean;
}

export interface ButtonProps {
  $isActive: boolean;
}

export type ButtonLabelProps = ButtonProps;

export interface OptionListItemProps {
  $selected?: boolean;
  $enabled?: boolean;
}
