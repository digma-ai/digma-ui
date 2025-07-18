import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../../containers/Agentic/hooks";
import { setStatusDetails } from "../../../../redux/slices/incidentsSlice";
import { CodeSnippet } from "../../../common/CodeSnippet";
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
        <span>Exception type: {statusDetails.info.exception_type}</span>
        <span>Message: {statusDetails.info.message}</span>
        <CodeSnippet text={statusDetails.info.stack_trace} />
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
