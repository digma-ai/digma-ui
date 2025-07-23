import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../../containers/Agentic/hooks";
import { useCancelIncidentMutation } from "../../../../redux/services/digma";
import { setIncidentToCancel } from "../../../../redux/slices/incidentsSlice";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import * as s from "./styles";

export const CancelIncidentDialogOverlay = () => {
  const incidentId = useAgenticSelector(
    (state) => state.incidents.incidentToCancel
  );
  const dispatch = useAgenticDispatch();

  const [cancelIncident] = useCancelIncidentMutation();

  const handleCancelConfirmationDialogClose = () => {
    dispatch(setIncidentToCancel(null));
  };

  const handleCancelConfirmationDialogConfirm = () => {
    if (incidentId) {
      void cancelIncident({ id: incidentId });
    }

    dispatch(setIncidentToCancel(null));
  };

  return (
    <s.StyledOverlay>
      <CancelConfirmation
        header={"Cancel incident?"}
        description={"Are you sure that you want to cancel the incident?"}
        onClose={handleCancelConfirmationDialogClose}
        onConfirm={handleCancelConfirmationDialogConfirm}
        confirmBtnText={"Yes, cancel"}
        cancelBtnText={"No"}
      />
    </s.StyledOverlay>
  );
};
