import type { Directive } from "../../../redux/services/types";

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
