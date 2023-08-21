export interface NoObservabilityCardProps {
  hasMissingDependency: boolean;
  canInstrumentMethod: boolean;
  onAutofix: () => void;
  onAddAnnotation: () => void;
}
