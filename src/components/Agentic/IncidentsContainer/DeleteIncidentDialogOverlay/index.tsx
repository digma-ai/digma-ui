import { useNavigate } from "react-router";
import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../../containers/Agentic/hooks";
import {
  useDeleteIncidentMutation,
  useLazyGetIncidentsQuery
} from "../../../../redux/services/digma";
import { setIncidentToDelete } from "../../../../redux/slices/incidentsSlice";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import * as s from "./styles";

export const DeleteIncidentDialogOverlay = () => {
  const incidentId = useAgenticSelector(
    (state) => state.incidents.incidentToDelete
  );
  const dispatch = useAgenticDispatch();
  const navigate = useNavigate();

  const [deleteIncident] = useDeleteIncidentMutation();
  const [triggerLazyGetIncidents] = useLazyGetIncidentsQuery(undefined);

  const handleDeleteConfirmationDialogClose = () => {
    dispatch(setIncidentToDelete(null));
  };

  const handleDeleteConfirmationDialogConfirm = () => {
    if (incidentId) {
      void deleteIncident({ id: incidentId })
        .unwrap()
        .then(() => {
          void triggerLazyGetIncidents()
            .unwrap()
            .then(() => {
              void navigate("/agentic/incidents");
            });
        });
    }

    dispatch(setIncidentToDelete(null));
  };

  return (
    <s.StyledOverlay>
      <CancelConfirmation
        header={"Delete incident?"}
        description={"Are you sure that you want to delete the incident?"}
        onClose={handleDeleteConfirmationDialogClose}
        onConfirm={handleDeleteConfirmationDialogConfirm}
        confirmBtnText={"Yes, delete"}
        cancelBtnText={"No"}
      />
    </s.StyledOverlay>
  );
};
