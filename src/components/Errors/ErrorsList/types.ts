export interface ErrorsListProps {
  spanCodeObjectId: string;
  methodId?: string;
  onErrorSelect: (id: string) => void;
  environmentId?: string;
}
