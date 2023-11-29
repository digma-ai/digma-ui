export interface MenuItem {
  label: string;
  value: string;
  selected?: boolean;
}

export interface FilterMenuProps {
  title: string;
  items: MenuItem[];
  onItemClick: (value: string) => void;
  onClose: () => void;
}
