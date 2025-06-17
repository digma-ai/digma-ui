export interface Directive {
  id: string;
  condition: string;
  directive: string;
  agents: string[];
}

export interface ExtendedDirective extends Directive {
  number: number;
  isSelected: boolean;
}

export type ContentAlignment = "left" | "center" | "right";

export interface ColumnMeta {
  width: string | number;
  minWidth?: string | number;
  textAlign?: ContentAlignment;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}
