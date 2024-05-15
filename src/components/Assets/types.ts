export interface ServiceData {
  services: string[];
}

export interface DataRefresher {
  refresh: () => void;
}

export interface AssetsProps {
  selectedTypeId?: string;
}

export interface FadingContainerProps {
  $transitionClassName: string;
  $transitionDuration: number;
}
