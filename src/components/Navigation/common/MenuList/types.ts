export interface MenuListProps {
  items: {
    customContent?: React.ReactNode;
    id: string;
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isDisabled?: boolean;
    groupName?: string;
  }[];
  showGroupNames?: boolean;
  showGroupDividers?: boolean;
}

export interface ListItemProps {
  $isDisabled?: boolean;
}
