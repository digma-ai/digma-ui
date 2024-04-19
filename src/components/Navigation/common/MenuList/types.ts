export interface MenuListProps {
  items: MenuItem[];
  showGroupNames?: boolean;
  showGroupDividers?: boolean;
}

export interface ListItemProps {
  $isDisabled?: boolean;
}

export interface MenuItem {
  customContent?: React.ReactNode;
  id: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
  groupName?: string;
}
