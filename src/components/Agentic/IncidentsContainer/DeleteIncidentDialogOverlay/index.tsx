import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../../containers/Agentic/hooks";
import { useDeleteIncidentMutation } from "../../../../redux/services/digma";
import { setIncidentToDelete } from "../../../../redux/slices/incidentsSlice";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import * as s from "./styles";

export const DeleteIncidentDialogOverlay = () => {
  const incidentId = useAgenticSelector(
    (state) => state.incidents.incidentToDelete
  );
  const dispatch = useAgenticDispatch();

  const [deleteIncident] = useDeleteIncidentMutation();

  const handleDeleteConfirmationDialogClose = () => {
    dispatch(setIncidentToDelete(null));
  };

  const handleDeleteConfirmationDialogConfirm = () => {
    if (incidentId) {
      void deleteIncident({ id: incidentId });
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
