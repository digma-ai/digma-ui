export interface SetPinUnpinErrorResultPayload {
  id: string;
  status: "success" | "failure";
}

export interface DismissBtnIconProps {
  $isDismissedMode: boolean;
}
