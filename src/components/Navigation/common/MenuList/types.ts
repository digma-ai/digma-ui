export interface MenuListProps {
  items: MenuItem[];
  showGroupNames?: boolean;
  showGroupDividers?: boolean;
  highlightSelected?: boolean;
}

export interface ListItemProps {
  $isDisabled?: boolean;
  $isHighlighted?: boolean;
}

export interface ListItemIconContainerProps {
  $isHighlighted?: boolean;
}

export interface MenuItem {
  customContent?: React.ReactNode;
  id: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
  groupName?: string;
  isSelected?: boolean;
}
