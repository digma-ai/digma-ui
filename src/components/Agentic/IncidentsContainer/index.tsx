import { Outlet } from "react-router";
import { useAgenticSelector } from "../../../containers/Agentic/hooks";
import { CloseIncidentDialogOverlay } from "./CloseIncidentDialogOverlay";
import { CreateIncidentChatOverlay } from "./CreateIncidentChatOverlay";
import { StatusDetailsOverlay } from "./StatusDetailsOverlay";
import * as s from "./styles";

export const IncidentsContainer = () => {
  const isCreateIncidentChatOpen = useAgenticSelector(
    (state) => state.incidents.isCreateIncidentChatOpen
  );

  const incidentToClose = useAgenticSelector(
    (state) => state.incidents.incidentToClose
  );

  const statusDetails = useAgenticSelector(
    (state) => state.incidents.statusDetails
  );

  return (
    <s.Container>
      <Outlet />
      {isCreateIncidentChatOpen && <CreateIncidentChatOverlay />}
      {incidentToClose && <CloseIncidentDialogOverlay />}
      {statusDetails && <StatusDetailsOverlay />}
    </s.Container>
  );
};
