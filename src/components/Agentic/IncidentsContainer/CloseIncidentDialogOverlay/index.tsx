import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../../containers/Agentic/hooks";
import { useCloseIncidentMutation } from "../../../../redux/services/digma";
import { setIncidentToClose } from "../../../../redux/slices/incidentsSlice";
import { CancelConfirmation } from "../../../common/CancelConfirmation";
import * as s from "./styles";

export const CloseIncidentDialogOverlay = () => {
  const incidentId = useAgenticSelector(
    (state) => state.incidents.incidentToClose
  );
  const dispatch = useAgenticDispatch();

  const [closeIncident] = useCloseIncidentMutation();

  const handleCloseConfirmationDialogClose = () => {
    dispatch(setIncidentToClose(null));
  };

  const handleCloseConfirmationDialogConfirm = () => {
    if (incidentId) {
      void closeIncident({ id: incidentId });
    }

    dispatch(setIncidentToClose(null));
  };

  return (
    <s.StyledOverlay>
      <CancelConfirmation
        header={"Close incident?"}
        description={"Are you sure that you want to close the incident?"}
        onClose={handleCloseConfirmationDialogClose}
        onConfirm={handleCloseConfirmationDialogConfirm}
        confirmBtnText={"Yes, close"}
        cancelBtnText={"No"}
      />
    </s.StyledOverlay>
  );
};
