export interface ServerStepProps {
  onConnect: (settings: string) => void;
  connectionSettings: string;
  onConnectionSettingsChange: (settings: string) => void;
}
