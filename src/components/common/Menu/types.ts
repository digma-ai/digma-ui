export interface MenuProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
}
