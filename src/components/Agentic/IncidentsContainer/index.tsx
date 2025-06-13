import { Outlet } from "react-router";
import { useAgenticSelector } from "../../../containers/Agentic/hooks";
import { CreateIncidentChatOverlay } from "./CreateIncidentChatOverlay";
import * as s from "./styles";

export const IncidentsContainer = () => {
  const isCreateIncidentChatOpen = useAgenticSelector(
    (state) => state.incidents.isCreateIncidentChatOpen
  );

  return (
    <s.Container>
      <Outlet />
      {isCreateIncidentChatOpen && <CreateIncidentChatOverlay />}
    </s.Container>
  );
};
