import { Outlet } from "react-router";
import { useAgenticSelector } from "../../../containers/Agentic/hooks";
import { CancelIncidentDialogOverlay } from "./CancelIncidentDialogOverlay";
import { CloseIncidentDialogOverlay } from "./CloseIncidentDialogOverlay";
import { CreateIncidentChatOverlay } from "./CreateIncidentChatOverlay";
import { DeleteIncidentDialogOverlay } from "./DeleteIncidentDialogOverlay";
import { StatusDetailsOverlay } from "./StatusDetailsOverlay";
import * as s from "./styles";

export const IncidentsContainer = () => {
  const isCreateIncidentChatOpen = useAgenticSelector(
    (state) => state.incidents.isCreateIncidentChatOpen
  );

  const incidentToCancel = useAgenticSelector(
    (state) => state.incidents.incidentToCancel
  );

  const incidentToClose = useAgenticSelector(
    (state) => state.incidents.incidentToClose
  );

  const incidentToDelete = useAgenticSelector(
    (state) => state.incidents.incidentToDelete
  );

  const statusDetails = useAgenticSelector(
    (state) => state.incidents.statusDetails
  );

  return (
    <s.Container>
      <Outlet />
      {isCreateIncidentChatOpen && <CreateIncidentChatOverlay />}
      {incidentToCancel && <CancelIncidentDialogOverlay />}
      {incidentToClose && <CloseIncidentDialogOverlay />}
      {incidentToDelete && <DeleteIncidentDialogOverlay />}
      {statusDetails && <StatusDetailsOverlay />}
    </s.Container>
  );
};
