export interface ServiceData {
  services: string[];
}

export interface DataRefresher {
  refresh: () => void;
}
