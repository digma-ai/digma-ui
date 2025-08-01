import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../../containers/Agentic/hooks";
import { setStatusDetails } from "../../../../redux/slices/incidentsSlice";
import * as s from "./styles";
import { isErrorStatusDetails } from "./typeGuards";

export const StatusDetailsOverlay = () => {
  const statusDetails = useAgenticSelector(
    (state) => state.incidents.statusDetails
  );

  const dispatch = useAgenticDispatch();

  const handleDialogClose = () => {
    dispatch(setStatusDetails(null));
  };

  let content = null;

  if (statusDetails && isErrorStatusDetails(statusDetails)) {
    content = (
      <s.ErrorDetailsContentContainer>
        <span>Exception type: {statusDetails.info.error.exception_type}</span>
        <span>Message: {statusDetails.info.error.message}</span>
        <span>Stack trace: </span>
        <s.StyledCodeSnippet text={statusDetails.info.error.stack_trace} />
      </s.ErrorDetailsContentContainer>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <s.StyledOverlay>
      <s.StyledDialog onClose={handleDialogClose} title={"Details"}>
        {content}
      </s.StyledDialog>
    </s.StyledOverlay>
  );
};
